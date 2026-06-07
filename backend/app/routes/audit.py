from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

from app.database.db import get_db
from app.database.models import AuditLog

router = APIRouter(
    prefix="/audit-logs",
    tags=["Audit Logs"],
)

class AuditLogResponse(BaseModel):
    id: int
    claim: str
    status: str
    confidence: float
    reason: str
    evidence: str
    db_action: str
    verdict: str
    similarity_score: Optional[float] = None
    conflicting_fact_id: Optional[int] = None
    stored_claim: Optional[str] = None
    stored_status: Optional[str] = None
    created_at: datetime
    timestamp: str

    class Config:
        from_attributes = True

@router.get("/", response_model=List[AuditLogResponse])
def get_audit_logs(db: Session = Depends(get_db)):
    logs = db.query(AuditLog).order_by(AuditLog.created_at.desc()).all()
    # Add timestamp directly to response dicts to keep frontend happy
    result = []
    for log in logs:
        log_dict = {
            "id": log.id,
            "claim": log.claim,
            "status": log.status,
            "confidence": log.confidence,
            "reason": log.reason,
            "evidence": log.evidence,
            "db_action": log.db_action,
            "verdict": log.verdict,
            "similarity_score": log.similarity_score,
            "conflicting_fact_id": log.conflicting_fact_id,
            "stored_claim": log.stored_claim,
            "stored_status": log.stored_status,
            "created_at": log.created_at,
            "timestamp": log.created_at.isoformat()
        }
        result.append(log_dict)
    return result

@router.get("/{log_id}", response_model=AuditLogResponse)
def get_audit_log(log_id: int, db: Session = Depends(get_db)):
    log = db.query(AuditLog).filter(AuditLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Audit log not found")
        
    log_dict = {
        "id": log.id,
        "claim": log.claim,
        "status": log.status,
        "confidence": log.confidence,
        "reason": log.reason,
        "evidence": log.evidence,
        "db_action": log.db_action,
        "verdict": log.verdict,
        "similarity_score": log.similarity_score,
        "conflicting_fact_id": log.conflicting_fact_id,
        "stored_claim": log.stored_claim,
        "stored_status": log.stored_status,
        "created_at": log.created_at,
        "timestamp": log.created_at.isoformat()
    }
    return log_dict
