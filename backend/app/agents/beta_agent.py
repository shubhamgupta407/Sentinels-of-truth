import json
from datetime import datetime
from app.database.models import Fact
from app.database.db import SessionLocal
from app.state.state import AgentState
from app.services.embedding_service import get_embedding, get_similarity
from app.services.llm_service import check_contradiction


def beta_agent(state: AgentState) -> AgentState:
    report = state.get("report", {})
    if not report:
        return state

    claim = report.get("claim", "")
    status = report.get("status", "")

    db = SessionLocal()
    try:
        #Exact duplicate — no point storing it again.
        if db.query(Fact).filter(Fact.claim == claim).first():
            state["db_action"] = "DISCARD"
            state["verdict"] = "redundant"
            return state

        claim_emb = get_embedding(claim)
        facts = db.query(Fact).all()

        best_score = -1.0
        top_claim = None
        top_fact = None

        for fact in facts:
            if fact.claim == claim:
                continue

            fact_emb = json.loads(fact.embedding) if fact.embedding else get_embedding(fact.claim)
            score = get_similarity(claim_emb, fact_emb)

            if score > best_score:
                best_score = score
                top_claim = fact.claim
                top_fact = fact

        #0.85 threshold — anything above this is close enough to check.
        if best_score > 0.85 and top_claim:
            result = check_contradiction(claim, top_claim)

            if result == "AGREE":
                state["db_action"] = "DISCARD"
                state["verdict"] = "redundant"
                return state

            elif result == "CONTRADICTORY":
                state["db_action"] = "FLAG"
                state["verdict"] = "conflict"
                if top_fact:
                    state["conflicting_fact_id"] = top_fact.id
                    state["stored_claim"] = top_fact.claim
                    state["similarity_score"] = best_score
                    state["stored_status"] = top_fact.status
                return state

        if status != "VERIFIED":
            state["db_action"] = "DISCARD"
            state["verdict"] = "unverified"
            return state

        state["db_action"] = "INSERT"
        state["verdict"] = "new"

        emb_data = claim_emb.tolist() if hasattr(claim_emb, 'tolist') else claim_emb
        new_fact = Fact(
            claim=claim,
            status=status,
            confidence=report.get("confidence"),
            evidence=report.get("evidence"),
            created_at=datetime.utcnow().isoformat(),
            embedding=json.dumps(emb_data)
        )
        db.add(new_fact)
        db.commit()

    finally:
        db.close()

    return state
