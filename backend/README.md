# Uwazi Backend

This is the backend for the Uwazi project. It provides:
- Sentiment analysis via `/analyze`
- Article comparison via `/compare`

## Tech Stack
- Python 3
- FastAPI
- NLTK (VADER Sentiment Analyzer)

## Running Locally

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

## Deploying to Render

1. Push this folder to a GitHub repo.
2. Go to https://render.com, create a new "Web Service".
3. Set the start command to:

```bash
uvicorn main:app --host 0.0.0.0 --port 10000
```

4. Deploy and test at your Render URL.