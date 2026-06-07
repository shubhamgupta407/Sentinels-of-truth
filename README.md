# Sentinels of Truth
### Multi-Agent Knowledge Verification & Fact Validation Platform

![Multi-Agent](https://img.shields.io/badge/Multi--Agent-LangGraph-blue)
![Verification](https://img.shields.io/badge/Fact-Verification-success)
![Semantic Search](https://img.shields.io/badge/Semantic-Search-orange)
![Knowledge Base](https://img.shields.io/badge/Knowledge-Base-purple)
![Audit Logs](https://img.shields.io/badge/Audit-Logs-informational)

Sentinels of Truth is an AI-powered fact verification platform that combines external evidence retrieval, large language model reasoning, semantic similarity search, and knowledge base validation to determine the credibility of factual claims.

The system is orchestrated using **LangGraph**, where multiple agents collaborate through a shared **AgentState** to verify, validate, and manage facts before they are stored in the knowledge base.

---

## Problem Statement

The internet contains an overwhelming amount of information, making it difficult to distinguish verified facts from misinformation.

Traditional search systems retrieve information but do not perform structured verification or knowledge base consistency checks.

Sentinels of Truth addresses this challenge through a multi-agent verification workflow that:

- Retrieves supporting evidence from trusted web sources
- Performs AI-driven fact verification
- Detects duplicate facts
- Detects contradictory facts
- Maintains knowledge base integrity
- Provides a complete audit trail of all verification activities

---

# System Architecture

## LangGraph Orchestration Workflow

```text
START
  │
  ▼
AgentState
  │
  ▼
Alpha Agent
(Evidence Verification)
  │
  ▼
Beta Agent
(Knowledge Base Validation)
  │
  ▼
END
```

The workflow is implemented using LangGraph StateGraph orchestration.

Each stage receives and updates a shared AgentState object, enabling transparent state transitions across the verification pipeline.

---

# AgentState Schema

```python
class AgentState(TypedDict):
    claim: str
    report: dict
    verdict: str
    db_action: str
    history: list[str]
```

The AgentState acts as the shared memory structure exchanged between agents during execution.

---

# Verification Pipeline

```text
User Claim
    │
    ▼
Tavily Search
    │
    ▼
Evidence Retrieval
    │
    ▼
Evidence Chunking
    │
    ▼
Semantic Ranking
    │
    ▼
Top-K Evidence Selection
    │
    ▼
Groq LLM Verification
    │
    ▼
Alpha Verification Report
    │
    ▼
Embedding Generation
    │
    ▼
Knowledge Base Similarity Search
    │
    ▼
Duplicate Detection
    │
    ▼
Contradiction Detection
    │
    ▼
Decision Engine
    │
    ├── INSERT
    ├── DISCARD
    └── FLAG
    │
    ▼
Persistent Audit Logging
```

---

# Alpha Agent

## Responsibility

The Alpha Agent performs factual verification using external evidence.

### Workflow

```text
Claim Input
    │
    ▼
Tavily Retrieval
    │
    ▼
Evidence Chunking
    │
    ▼
Semantic Ranking
    │
    ▼
Top-K Evidence Retrieval
    │
    ▼
LLM Verification
    │
    ▼
Verification Report
```

### Outputs

- Verification Status
- Confidence Score
- Supporting Evidence
- Explanation
- Structured Verification Report

---

# Beta Agent

## Responsibility

The Beta Agent protects knowledge base integrity.

### Workflow

```text
Alpha Report
    │
    ▼
Embedding Generation
    │
    ▼
Similarity Search
    │
    ▼
Knowledge Base Comparison
    │
    ▼
Contradiction Analysis
    │
    ▼
Decision Engine
```

### Outputs

- INSERT
- DISCARD
- FLAG

### Responsibilities

- Detect duplicate facts
- Detect contradictory facts
- Prevent redundant storage
- Protect knowledge base consistency
- Determine final database action

---

# Knowledge Base Decision Logic

```text
Similarity > Threshold?
        │
   ┌────┴────┐
   │         │
  NO        YES
   │         │
 INSERT   Contradiction Check
             │
      ┌──────┴──────┐
      │             │
 Consistent   Contradictory
      │             │
 DISCARD       FLAG
```

---

# Audit Logging System

Every verification request is permanently recorded.

Stored Information:

- Claim
- Verification Status
- Confidence Score
- Explanation
- Evidence
- Database Action
- Final Verdict
- Similarity Score
- Related Fact References
- Timestamp

### Features

- Persistent Storage
- Refresh Safe
- Searchable
- Filterable
- Historical Verification Records

---

# Technical Traceability

The system exposes execution trace visibility through the frontend interface.

Example Trace:

```text
Stage 0: LangGraph Orchestration
    ├── START
    ├── AgentState Initialized
    ├── Alpha Agent Node
    ├── Beta Agent Node
    └── END

Stage 1: Claim Processing

Stage 2: Evidence Retrieval

Stage 3: Semantic Retrieval Pipeline

Stage 4: Alpha Agent Reasoning

Stage 5: Beta Agent Validation

Stage 6: Knowledge Base Decision
```

---

# Tech Stack

## Backend

- FastAPI
- LangGraph
- LangChain
- Groq LLM
- Tavily Search API
- SQLAlchemy
- SQLite
- Pydantic

## AI & NLP

- Sentence Transformers
- Semantic Similarity Search
- Cosine Similarity
- Embedding-Based Retrieval

## Frontend

- React
- JavaScript
- CSS
- Vite

---

# Project Structure

```text
backend/
│
├── app/
│   ├── agents/
│   │   ├── alpha_agent.py
│   │   └── beta_agent.py
│   │
│   ├── routes/
│   │   ├── verification.py
│   │   └── audit.py
│   │
│   ├── services/
│   │   ├── tavily_service.py
│   │   ├── llm_service.py
│   │   └── embedding_service.py
│   │
│   ├── database/
│   │   ├── db.py
│   │   └── models.py
│   │
│   ├── state/
│   │   └── state.py
│   │
│   └── main.py
│
├── requirements.txt
│
frontend/
│
├── src/
│   ├── components/
│   ├── views/
│   ├── services/
│   └── App.jsx
```

---

# API Endpoints

## Verify Claim

```http
POST /api/v1/verify/
```

### Request

```json
{
  "claim": "Google CEO is Sundar Pichai."
}
```

### Response

```json
{
  "claim": "Google CEO is Sundar Pichai.",
  "status": "VERIFIED",
  "confidence": 95,
  "reason": "Evidence supports the claim.",
  "evidence": "...",
  "db_action": "INSERT",
  "verdict": "NEW"
}
```

---

## Fetch Audit Logs

```http
GET /api/v1/audit-logs
```

---

## Health Check

```http
GET /health
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/sentinels-of-truth.git
```

```bash
cd sentinels-of-truth
```

---

## Backend Setup

```bash
cd backend
```

```bash
python -m venv venv
```

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create .env

```env
GROQ_API_KEY=your_key
TAVILY_API_KEY=your_key
```

Run Backend:

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

---

# Example Use Cases

### Verified Fact

```text
Google CEO is Sundar Pichai.
```

Result:

```text
VERIFIED
INSERT
```

---

### Duplicate Fact

```text
Water boils at 100°C at sea level.
```

Result:

```text
VERIFIED
DISCARD
```

---

### Contradictory Fact

```text
Rahul Gandhi is the Prime Minister of India.
```

Result:

```text
UNVERIFIED
DISCARD
```

---

# Future Improvements

## Retrieval Quality

- Top-K Diverse Retrieval
- Maximum Marginal Relevance (MMR)
- Hybrid Search (Semantic + Keyword)
- Source Reliability Scoring
- Citation Ranking

## Scalability

- FAISS / Vector Database Integration
- Approximate Nearest Neighbor Search
- PostgreSQL + pgvector
- Distributed Embedding Storage

## Multi-Agent Enhancements

- Dynamic Agent Routing
- Additional Specialized Agents
- Multi-Step Reasoning Workflows
- Human-in-the-Loop Verification

## Performance & Concurrency

- Concurrent Verification Requests
- Async Agent Execution
- Queue-Based Processing
- Background Verification Workers
- Horizontal API Scaling

---

# Key Features

✅ LangGraph Multi-Agent Orchestration

✅ Shared AgentState Architecture

✅ External Evidence Retrieval

✅ AI-Powered Fact Verification

✅ Semantic Similarity Search

✅ Duplicate Detection

✅ Contradiction Detection

✅ Knowledge Base Integrity Protection

✅ Persistent Audit Logs

✅ Execution Trace Visibility

✅ Explainable Verification Pipeline

✅ RESTful FastAPI Backend

---

# Version

**Sentinels of Truth v0.1.0**

An AI-Powered Multi-Agent Fact Verification & Knowledge Base System built using LangGraph, FastAPI, Groq, Tavily Search, Semantic Retrieval, and Persistent Audit Logging.
