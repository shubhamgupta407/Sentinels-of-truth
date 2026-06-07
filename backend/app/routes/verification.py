from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from datetime import datetime
from langgraph.graph import StateGraph, START, END
from app.agents.alpha_agent import alpha_agent
from app.agents.beta_agent import beta_agent
from app.state.state import AgentState
from app.database.db import get_db
from app.database.models import AuditLog

router = APIRouter(
    prefix="/verify",
    tags=["Verification"],
)


class ClaimRequest(BaseModel):
    claim: str


class VerificationResponse(BaseModel):
    claim: str
    status: str
    confidence: float
    reason: str
    evidence: str
    db_action: str
    verdict: str
    conflicting_fact_id: Optional[int] = None
    stored_claim: Optional[str] = None
    similarity_score: Optional[float] = None
    stored_status: Optional[str] = None


# alpha -> beta, straightforward pipeline
workflow = StateGraph(AgentState)
workflow.add_node("alpha", alpha_agent)
workflow.add_node("beta", beta_agent)
workflow.add_edge(START, "alpha")
workflow.add_edge("alpha", "beta")
workflow.add_edge("beta", END)

app_graph = workflow.compile()


@router.post("/", response_model=VerificationResponse, response_model_exclude_none=True)
async def verify_claim(request: ClaimRequest, db: Session = Depends(get_db)):
    # runs the claim through alpha then beta and returns the final verdict
    if not request.claim.strip():
        raise HTTPException(status_code=400, detail="Claim cannot be empty")

    initial_state = {
        "claim": request.claim,
        "report": {},
        "verdict": "",
        "db_action": "",
        "history": ["Workflow initialized"]
    }

    try:
        final_state = app_graph.invoke(initial_state)
        report = final_state.get("report", {})

        if not report:
            raise HTTPException(status_code=500, detail="Failed to generate verification report")

        response = VerificationResponse(
            claim=report.get("claim", request.claim),
            status=report.get("status", "UNVERIFIED"),
            confidence=report.get("confidence", 0.0),
            reason=report.get("reason", "No reason provided."),
            evidence=report.get("evidence", ""),
            db_action=final_state.get("db_action", ""),
            verdict=final_state.get("verdict", ""),
            conflicting_fact_id=final_state.get("conflicting_fact_id"),
            stored_claim=final_state.get("stored_claim"),
            similarity_score=final_state.get("similarity_score"),
            stored_status=final_state.get("stored_status")
        )

        # log every request regardless of verdict
        audit_log = AuditLog(
            claim=response.claim,
            status=response.status,
            confidence=response.confidence,
            reason=response.reason,
            evidence=response.evidence,
            db_action=response.db_action,
            verdict=response.verdict,
            similarity_score=response.similarity_score,
            conflicting_fact_id=response.conflicting_fact_id,
            stored_claim=response.stored_claim,
            stored_status=response.stored_status,
            created_at=datetime.utcnow()
        )
        db.add(audit_log)
        db.commit()

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
