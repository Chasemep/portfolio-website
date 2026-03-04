from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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
    
    # Email notification logic
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASSWORD")
    receiver_email = os.getenv("EMAIL_RECEIVER", "chasemep05@gmail.com")

    if not all([smtp_user, smtp_pass]):
        # Fallback for local dev if env vars are missing
        print("Warning: SMTP credentials not configured. Skipping email.")
        return {"message": "Message received (email skipped)"}

    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = receiver_email
        msg['Subject'] = f"New Portfolio Contact from {form.name}"

        body = f"Name: {form.name}\nEmail: {form.email}\n\nMessage:\n{form.message}"
        msg.attach(MIMEText(body, 'plain'))

        # Send email
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
            
        return {"message": "Message received and email sent"}
    except Exception as e:
        print(f"Error sending email: {e}")
        # We still return success to the user, but log the error
        return {"message": "Message received, but notification failed", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
