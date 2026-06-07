from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def get_embedding(text: str):
    return model.encode(text)

def get_similarity(
    embedding_1,
    embedding_2
):
    return cosine_similarity(
        [embedding_1],
        [embedding_2]
    )[0][0]
