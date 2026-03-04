from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv
from database import get_db, init_db

load_dotenv()

app = FastAPI(title="Portfolio API")

# Configure CORS
origins = [
    "http://localhost:3000",
    "https://portfolio-website-oypg.onrender.com",
    "https://www.chasemep.com",
    "https://chasemep.com",
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

@app.get("/")
async def root():
    return {"message": "Portfolio API is running"}

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
    # Basic validation
    if not form.captcha_token:
        raise HTTPException(status_code=400, detail="CAPTCHA token required")
    
    # SendGrid Email Logic
    sendgrid_api_key = os.getenv("SENDGRID_API_KEY")
    sender_email = os.getenv("SENDGRID_SENDER", "chasemep05@gmail.com")
    receiver_email = os.getenv("EMAIL_RECEIVER", "chasemep05@gmail.com")

    if not sendgrid_api_key:
        print("Warning: SENDGRID_API_KEY not configured. Skipping email.")
        return {"message": "Message received (email skipped)"}

    message = Mail(
        from_email=sender_email,
        to_emails=receiver_email,
        subject=f"New Portfolio Contact from {form.name}",
        plain_text_content=f"Name: {form.name}\nEmail: {form.email}\n\nMessage:\n{form.message}"
    )
    message.reply_to = form.email

    try:
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        print(f"SendGrid Success: {response.status_code}")
        return {"message": "Message received and email sent"}
    except Exception as e:
        print(f"SendGrid Error: {e}")
        return {"message": "Message received, but notification failed", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
