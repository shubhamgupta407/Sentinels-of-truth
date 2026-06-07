import os
import json
import re
from groq import Groq


def verify_claim_with_groq(claim: str, evidence: str) -> dict:
    groq_api_key = os.getenv("GROQ_API_KEY")
    if not groq_api_key:
        return {"status": "UNVERIFIED", "confidence": 0.0}

    try:
        client = Groq(api_key=groq_api_key)

        prompt = f"""
You are a strict fact-checking AI. Evaluate the following claim based ONLY on the provided evidence.

CRITICAL VERIFICATION RULES:
1. Every critical fact in the claim must be supported by evidence.
2. Similarity is not verification. The fact that the same person, organization, or similar topics appear does NOT verify the claim.
3. Related facts are not verification.
4. Evidence must support the exact claim being made.
5. ONLY return "VERIFIED" if the evidence provides direct, explicit, and complete support for the exact claim.
6. Role/title mismatches (e.g., "Finance Minister" vs "Defence Minister", "Prime Minister" vs "Chief Minister") are contradictions and MUST return "UNVERIFIED".
7. Temporal context MUST match perfectly. If the claim is in PRESENT tense (e.g., "is the Home Minister") and evidence shows PAST tense (e.g., "served as", "was", "former"), this is a DIRECT CONTRADICTION. You MUST return "UNVERIFIED". Past evidence does not verify present claims.

CONFIDENCE SCORE RULES:
Confidence must represent your confidence in your VERIFICATION DECISION (How certain are you that your final verdict is correct?), NOT how likely the claim is true.
- If evidence directly supports the claim -> VERIFIED with HIGH confidence (90-100).
- If evidence directly contradicts the claim -> UNVERIFIED with HIGH confidence (90-100), because you are highly confident in the rejection.
- If evidence is ambiguous, incomplete, weak, or missing -> UNVERIFIED with MODERATE confidence (40-70).

EXAMPLES:
Example 1:
Claim: "Narendra Modi is the Prime Minister of India."
Evidence: "Narendra Modi is the Prime Minister of India."
Result: {{"status": "VERIFIED", "confidence": 95, "reason": "Evidence directly supports the claim."}}

Example 2:
Claim: "Rajnath Singh is the Finance Minister of India."
Evidence: "Rajnath Singh is the Defence Minister of India."
Result: {{"status": "UNVERIFIED", "confidence": 95, "reason": "Evidence clearly contradicts the claim regarding the ministerial role."}}

Example 3:
Claim: "Yogi Adityanath is the Prime Minister of India."
Evidence: "Yogi Adityanath is the Chief Minister of Uttar Pradesh."
Result: {{"status": "UNVERIFIED", "confidence": 95, "reason": "Evidence clearly shows a different position, contradicting the claim."}}

Example 4:
Claim: "Weak or incomplete claim."
Evidence: "Partial evidence with insufficient support."
Result: {{"status": "UNVERIFIED", "confidence": 50, "reason": "The verdict is less certain because the evidence is incomplete."}}

Example 5:
Claim: "Rajnath Singh is the Home Minister of India."
Evidence: "Rajnath Singh served as the Home Minister of India from 2014 to 2019."
Result: {{"status": "UNVERIFIED", "confidence": 95, "reason": "Evidence shows he was the Home Minister in the past, which contradicts the present tense claim that he is the Home Minister now."}}

Respond strictly in JSON format with keys "status", "confidence", and "reason". Provide confidence (0-100) reflecting certainty in your verification decision.

Claim: {claim}

Evidence:
{evidence}
"""

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.1-8b-instant",
            response_format={"type": "json_object"}
        )

        content = chat_completion.choices[0].message.content

        try:
            result = json.loads(content)
        except json.JSONDecodeError:
            # shouldn't happen with json_object format but just in case
            match = re.search(r'\{.*\}', content, re.DOTALL)
            if match:
                result = json.loads(match.group(0))
            else:
                raise ValueError("no JSON found in response")

        status = result.get("status", "UNVERIFIED")
        if status not in ["VERIFIED", "UNVERIFIED"]:
            status = "UNVERIFIED"

        confidence = result.get("confidence", 0)
        if isinstance(confidence, str):
            confidence = confidence.replace('%', '').strip()
        try:
            confidence = float(confidence)
            if 0.0 < confidence <= 1.0:
                confidence = confidence * 100
            confidence = round(confidence)
        except (ValueError, TypeError):
            confidence = 0

        reason = str(result.get("reason", "No reason provided."))

        return {"status": status, "confidence": confidence, "reason": reason}

    except Exception as e:
        print(f"Groq verification error: {e}")
        return {
            "status": "UNVERIFIED",
            "confidence": 0,
            "reason": f"Verification failed: {str(e)}"
        }


def check_contradiction(claim: str, stored: str) -> str:
    groq_api_key = os.getenv("GROQ_API_KEY")
    if not groq_api_key:
        return "OK"

    try:
        client = Groq(api_key=groq_api_key)

        prompt = f"""
You are a fact-checking AI. Compare the following two claims.
Do they contradict each other, do they agree with each other (mean the same thing), or are they unrelated/different facts?
Respond strictly in JSON format like this:
{{"result": "CONTRADICTORY"}}, {{"result": "AGREE"}}, or {{"result": "UNRELATED"}}

Incoming Claim: {claim}
Stored Claim: {stored}
"""

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.1-8b-instant",
            response_format={"type": "json_object"}
        )

        content = chat_completion.choices[0].message.content

        try:
            result = json.loads(content)
        except json.JSONDecodeError:
            match = re.search(r'\{.*\}', content, re.DOTALL)
            if match:
                result = json.loads(match.group(0))
            else:
                return "OK"

        return str(result.get("result", "OK")).strip().upper()

    except Exception as e:
        print(f"Contradiction check error: {e}")
        return "OK"
