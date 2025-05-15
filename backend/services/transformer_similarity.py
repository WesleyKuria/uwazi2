from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")

def semantic_similarity(text1, text2):
    embeddings = model.encode([text1, text2])
    score = util.pytorch_cos_sim(embeddings[0], embeddings[1])
    return float(score)