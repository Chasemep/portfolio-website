from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from database import get_db, init_db

load_dotenv()

app = FastAPI(title="Portfolio API")

# Configure CORS
origins = [
    "http://localhost:3000",
    # Add production frontend URL here later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/projects")
async def get_projects():
    # Placeholder for DB fetch
    return [{"slug": "sample-project", "title": "Sample Project", "description": "This is a sample."}]

@app.get("/projects/{slug}")
async def get_project(slug: str):
    # Placeholder for DB fetch
    if slug == "sample-project":
        return {"slug": "sample-project", "title": "Sample Project", "content": "Detailed content here.", "tags": ["React", "Python"]}
    raise HTTPException(status_code=404, detail="Project not found")

class ContactForm(BaseModel):
    name: str
    email: str
    message: str
    captcha_token: str

@app.post("/contact")
async def submit_contact(form: ContactForm):
    # Basic validation and placeholder for actual email sending or database storing
    if not form.captcha_token:
        raise HTTPException(status_code=400, detail="CAPTCHA token required")
    return {"message": "Message received"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
