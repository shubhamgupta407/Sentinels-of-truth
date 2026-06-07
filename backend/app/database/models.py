from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from datetime import datetime
from .db import Base


class Fact(Base):
    __tablename__ = "facts"

    id = Column(Integer, primary_key=True, index=True)
    claim = Column(String, index=True)
    status = Column(String)         # e.g., "VERIFIED" or "UNVERIFIED"
    confidence = Column(Float)
    evidence = Column(Text)
    created_at = Column(String)     # using existing schema
    embedding = Column(Text, nullable=True)  # JSON string of floats


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    claim = Column(String, index=True)
    status = Column(String)
    confidence = Column(Float)
    reason = Column(Text)
    evidence = Column(Text)
    db_action = Column(String)      # INSERT / FLAG / DISCARD
    verdict = Column(String)        # new / redundant / conflict / unverified
    similarity_score = Column(Float, nullable=True)
    conflicting_fact_id = Column(Integer, nullable=True)
    stored_claim = Column(String, nullable=True)
    stored_status = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
