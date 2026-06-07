import os
from tavily import TavilyClient


def search_claim(claim: str) -> dict:
    tavily_api_key = os.getenv("TAVILY_API_KEY")
    if not tavily_api_key:
        return {"results": []}

    try:
        client = TavilyClient(api_key=tavily_api_key)
        # basic depth is fast enough, deep search takes too long for real-time use
        response = client.search(claim, search_depth="basic", max_results=3)
        return response
    except Exception as e:
        print(f"Tavily search error: {e}")
        return {"results": []}
