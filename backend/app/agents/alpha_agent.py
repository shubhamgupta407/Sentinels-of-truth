from app.state.state import AgentState
from app.services.tavily_service import search_claim
from app.services.embedding_service import get_embedding, get_similarity
import re


def chunk_text(text: str, chunk_size=250, overlap=50) -> list[str]:
    #Splitting on sentence boundaries so we don't cut mid-sentence if there is any common things between.
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    chunks = []
    current_chunk = []
    current_length = 0

    for sentence in sentences:
        if not sentence.strip():
            continue

        sentence_len = len(sentence.split())

        if current_length + sentence_len > chunk_size and current_chunk:
            chunks.append(" ".join(current_chunk))

            #Carry over last few sentences so context doesn't break between chunks!
            overlap_chunk = []
            overlap_length = 0
            for s in reversed(current_chunk):
                s_len = len(s.split())
                if overlap_length + s_len <= overlap or not overlap_chunk:
                    overlap_chunk.insert(0, s)
                    overlap_length += s_len
                else:
                    break

            current_chunk = overlap_chunk
            current_length = overlap_length

        current_chunk.append(sentence)
        current_length += sentence_len

    if current_chunk:
        chunks.append(" ".join(current_chunk))

    return chunks


def alpha_agent(state: AgentState) -> AgentState:
    claim = state["claim"]
    state["history"].append(f"Agent Alpha started investigating: {claim}")

    search_results = search_claim(claim)
    state["history"].append(f"Found {len(search_results['results'])} search results")

    evidence = ""
    if search_results["results"]:
        raw = "\n".join([r["content"] for r in search_results["results"]])
        chunks = chunk_text(raw)

        #Rank chunks by relevance to the claim instead of using all of them.
        claim_emb = get_embedding(claim)
        scored = []
        for chunk in chunks:
            chunk_emb = get_embedding(chunk)
            score = get_similarity(claim_emb, chunk_emb)
            scored.append((score, chunk))

        scored.sort(key=lambda x: x[0], reverse=True)
        top_chunks = [c for _, c in scored[:5]]  #top 5 is usually enough
        evidence = "\n...\n".join(top_chunks)

    result = {"status": "UNVERIFIED", "confidence": 0, "reason": "No evidence found."}
    if evidence:
        from app.services.llm_service import verify_claim_with_groq
        result = verify_claim_with_groq(claim, evidence)

    state["report"] = {
        "claim": claim,
        "status": result["status"],
        "confidence": result["confidence"],
        "reason": result.get("reason", ""),
        "evidence": evidence
    }
    state["history"].append("Verification report created")

    return state
