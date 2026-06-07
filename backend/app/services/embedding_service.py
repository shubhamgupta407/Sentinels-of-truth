import requests
import numpy as np
import os

HF_TOKEN = os.getenv("HF_TOKEN")
API_URL = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"

def get_embedding(text: str):
    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    res = requests.post(API_URL, headers=headers, json={
        "inputs": text,
        "options": {"wait_for_model": True}
    })
    result = res.json()
    #HF returns nested list sometimes — flatten it!
    if isinstance(result[0], list):
        return result[0]
    return result

def get_similarity(embedding_1, embedding_2):
    a = np.array(embedding_1)
    b = np.array(embedding_2)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))
