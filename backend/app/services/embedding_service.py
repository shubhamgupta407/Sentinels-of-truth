from huggingface_hub import InferenceClient
import numpy as np
import os

client = InferenceClient(token=os.getenv("HF_TOKEN"))

def get_embedding(text: str):
    result = client.feature_extraction(
        text, 
        model="sentence-transformers/all-MiniLM-L6-v2"
    )
    if isinstance(result[0], list):
        return result[0]
    return list(result)

def get_similarity(embedding_1, embedding_2):
    a = np.array(embedding_1)
    b = np.array(embedding_2)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))
