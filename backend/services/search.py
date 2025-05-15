import requests
from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

NEWS_API_KEY = "your_gnews_api_key"  # Replace with your actual GNews API key

@router.get("/search")
def search_news(q: str):
    try:
        url = f"https://gnews.io/api/v4/search?q={q}&lang=en&token={NEWS_API_KEY}"
        res = requests.get(url)
        if res.status_code == 200:
            return {"articles": res.json().get("articles", [])}
        return JSONResponse(status_code=500, content={"error": "Failed to fetch articles"})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})