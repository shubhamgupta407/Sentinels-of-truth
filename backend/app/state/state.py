from typing import TypedDict

class AgentState(TypedDict, total=False):
    claim: str          # the raw claim coming in
    report: dict        # alpha agent fills this after web search
    verdict: str        # redundant / unverified / conflict / new
    db_action: str      # INSERT / FLAG / DISCARD
    history: list[str]  # just a log of what happened, useful for debugging
    conflicting_fact_id: int   # set only when beta finds a contradiction
    stored_claim: str          # the existing claim it conflicted with
    similarity_score: float    # how similar the two claims were (0 to 1)
    stored_status: str         # status of that existing claim in the DB
