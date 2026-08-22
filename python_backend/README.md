# FastAPI Resume Chatbot

This service trains a small TF-IDF plus logistic-regression intent classifier at startup from curated resume and navigation examples. It does not call a general-purpose model and refuses questions outside Deep Chaudhari's resume, hiring requirements, contact details, and website navigation.

## Run locally

```powershell
cd python_backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
```

The API runs at `http://localhost:8000`. Test it with:

```powershell
Invoke-RestMethod http://localhost:8000/api/chat -Method Post -ContentType 'application/json' -Body '{"message":"What are Deep''s skills?"}'
```

To connect the Vite frontend during local development, create `.env.local` in the repository root:

```env
VITE_CHAT_API_URL=http://localhost:8000/api/chat
```

For the GitHub Pages site, set `VITE_CHAT_API_URL` to the deployed FastAPI URL when building the frontend. Configure `ALLOWED_ORIGINS` on the API to include `https://deep-0610.github.io`.