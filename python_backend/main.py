from __future__ import annotations

import os
import re
from typing import Literal

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

app = FastAPI(title="Deep Chaudhari Resume Chatbot", version="1.0.0")

allowed_origins = [origin.strip() for origin in os.getenv("ALLOWED_ORIGINS", "*").split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials="*" not in allowed_origins,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    message: str = Field(min_length=1, max_length=1500)
    history: list[dict] = Field(default_factory=list, max_length=8)


class ChatResponse(BaseModel):
    reply: str
    model: Literal["resume-intent-classifier"]
    intent: str
    confidence: float
    scope: Literal["resume-and-navigation"]


TRAINING_EXAMPLES = [
    ("what was Deep's experience at SpiroEdu", "experience"),
    ("tell me about his assistant CTO role", "experience"),
    ("what did he build at work", "experience"),
    ("what are Deep's certifications", "certifications"),
    ("show his verified credentials", "certifications"),
    ("does he have the Walmart certificate", "certifications"),
    ("what projects has Deep built", "projects"),
    ("tell me about the AI agent project", "projects"),
    ("show me his portfolio projects", "projects"),
    ("what technologies does Deep know", "skills"),
    ("what is his technical stack", "skills"),
    ("does he know React and Python", "skills"),
    ("where did Deep study", "education"),
    ("what is his degree and college", "education"),
    ("tell me about his education", "education"),
    ("what role is Deep looking for", "objective"),
    ("what are his career requirements", "objective"),
    ("is he available for a full stack role", "objective"),
    ("how do I contact Deep", "contact"),
    ("what is his email and phone number", "contact"),
    ("I want to hire Deep", "contact"),
    ("open the home page", "navigation"),
    ("take me to the experience page", "navigation"),
    ("show the certifications section", "navigation"),
    ("navigate to projects", "navigation"),
    ("open the contact page", "navigation"),
]


RESPONSES = {
    "experience": "**Deep Chaudhari** was **Assistant C.T.O. / Full Stack Engineering Lead** at **SpiroEdu Education Pvt Ltd**, incubated at SAKEC TBI, from **January 2025 to September 2025**.\n\nHe led React frontend work, authentication, REST APIs, MongoDB and SQL data flows, payment webhooks, responsive Figma implementation, and gamified user experiences.",
    "certifications": "Deep has **9 verified certifications**, including credentials from Walmart USA, UC Irvine, Infosys Springboard, IIM Bangalore, Simplilearn, IIT Bombay, and SAKEC TBI.\n\nOpen the [Certifications](certifications) page to inspect the details.",
    "projects": "Deep's featured work includes the **SpiroEdu Learning & Payment Engine**, a **Forward Deployment AI Agent & Search Pipeline**, a **Cryptographic Hash & Block Verification Engine**, and an **Enterprise Relational DB Optimizer & Munging Pipeline**.\n\nOpen the [Projects](projects) page for details.",
    "skills": "Deep's documented stack includes **React 19, TypeScript, JavaScript, Tailwind CSS, Node.js, Express.js, REST APIs, JWT authentication, SQL/PostgreSQL, MongoDB, Java, C, blockchain, cryptography, Google Gemini integration, Git, and GitHub**.",
    "education": "Deep is an undergraduate **B.Tech Computer Engineering** student at **Shah & Anchor Kutchhi Engineering College (SAKEC)** in Mumbai, with a study period of **2024 to 2028**.",
    "objective": "Deep is seeking **Forward Deployment Engineer** and **Full-Stack Software Engineering** opportunities. His focus is integrating AI solutions, building secure backend systems, and deploying scalable software in complex client environments.",
    "contact": "You can reach **Deep Chaudhari** at [deepsc0606@gmail.com](mailto:deepsc0606@gmail.com) or [+91 7738266248](tel:+917738266248). He is based in Mumbai, Maharashtra, India. Use the [Contact](contact) page to send an inquiry.",
}

OUT_OF_SCOPE = "I can only answer questions about **Deep Chaudhari's resume, experience, skills, certifications, projects, career requirements, contact details, and this website's navigation**."

vectorizer = TfidfVectorizer(lowercase=True, ngram_range=(1, 2), sublinear_tf=True)
classifier = LogisticRegression(max_iter=1000, random_state=42)
training_texts, training_labels = zip(*TRAINING_EXAMPLES)
classifier.fit(vectorizer.fit_transform(training_texts), training_labels)


def clean_message(message: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"[^\w\s?'.+#-]", " ", message)).strip()


def navigation_reply(message: str) -> str:
    normalized = message.lower()
    targets = {
        "home": "Opening the [Home]().",
        "experience": "Opening the [Experience](experience) page.",
        "work": "Opening the [Experience](experience) page.",
        "certification": "Opening the [Certifications](certifications) page.",
        "certificate": "Opening the [Certifications](certifications) page.",
        "project": "Opening the [Projects](projects) page.",
        "contact": "Opening the [Contact](contact) page.",
        "resume": "The resume is available on the [Home]().",
        "cv": "The resume is available on the [Home]().",
    }
    for keyword, reply in targets.items():
        if keyword in normalized:
            return reply
    return "Use the navigation bar to open [Experience](experience), [Certifications](certifications), [Projects](projects), or [Contact](contact)."


def predict(message: str) -> tuple[str, float]:
    probabilities = classifier.predict_proba(vectorizer.transform([message]))[0]
    best_index = probabilities.argmax()
    return classifier.classes_[best_index], float(probabilities[best_index])


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "service": "resume-intent-classifier", "owner": "Deep Chaudhari"}


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatMessage, request: Request) -> ChatResponse:
    message = clean_message(payload.message[:1500])
    if not message:
        return ChatResponse(reply=OUT_OF_SCOPE, model="resume-intent-classifier", intent="out_of_scope", confidence=1.0, scope="resume-and-navigation")

    intent, confidence = predict(message)
    if confidence < 0.34:
        intent = "out_of_scope"

    if intent == "navigation":
        reply = navigation_reply(message)
    else:
        reply = RESPONSES.get(intent, OUT_OF_SCOPE)

    return ChatResponse(reply=reply, model="resume-intent-classifier", intent=intent, confidence=round(confidence, 4), scope="resume-and-navigation")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8000")))