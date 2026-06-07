import os
import requests
from sklearn.metrics.pairwise import cosine_similarity

#Using the Hugging Face's free Inference API to grab embeddings without blowing up the memory!.

HF_API_URL = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"

def get_embedding(text: str):
    """
    Takes a string and returns a list of floats (the embedding).
    Instead of loading the heavy model locally, we ask Hugging Face to do the math.
    """
    
    hf_api_key = os.getenv("HF_API_KEY")
    
    headers = {}
    if hf_api_key:
        headers["Authorization"] = f"Bearer {hf_api_key}"

    #Sending the text over to Hugging Face
    response = requests.post(HF_API_URL, headers=headers, json={"inputs": text})

    # If something goes wrong (like a rate limit or a bad key), need to fail loudly.
    # Returning fake data (like a list of zeros) would cause false matches in the database!
    if response.status_code != 200:
        raise RuntimeError(f"Oops! Hugging Face API failed with status {response.status_code}: {response.text}")

    
    return response.json()

def get_similarity(embedding_1, embedding_2):
    """
    Calculates how semantically similar two embeddings are.
    We're keeping the exact same scikit-learn cosine similarity math as before!
    """
    return cosine_similarity(
        [embedding_1],
        [embedding_2]
    )[0][0]
