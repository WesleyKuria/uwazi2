from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from services.similarity import find_similar_articles
from services.sentiment import analyze_sentiment
from services import search

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ArticleRequest(BaseModel):
    text: str
    url: Optional[str] = None

class ComparisonRequest(BaseModel):
    base_article: str
    comparison_articles: List[str]

@app.post("/analyze")
def analyze_article(request: ArticleRequest):
    sentiment = analyze_sentiment(request.text)
    return {"sentiment": sentiment}

@app.post("/compare")
def compare_articles(request: ComparisonRequest):
    differences = find_similar_articles(request.base_article, request.comparison_articles)
    return {"differences": differences}

app.include_router(search.router)
