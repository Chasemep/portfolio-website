# Personal Portfolio Website

A clean, modern, and responsive personal portfolio website built with Next.js (Frontend) and FastAPI (Backend).

## Tech Stack
- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: FastAPI (Python), PostgreSQL
- **Deployment**: Vercel (Frontend), Render (Backend)

## Features
- Responsive design tailored for all devices (Mobile to Desktop)
- Project showcase with detailed views
- Contact form set up for reCAPTCHA integration
- SEO friendly metadata

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies: `pip install -r requirements.txt`
4. Copy the `.env.example` to `.env` and configure your database URL:
   ```bash
   cp .env.example .env
   ```
5. Initialize the database using `init.sql`. You can run this file in your PostgreSQL client (e.g. `psql -U postgres -d portfolio -f init.sql`).
6. Run the local development server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install Node.js dependencies: `npm install`
3. Copy the `.env.example` to `.env.local` and set your API URL:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server: `npm run dev`

## Deployment Instructions

### Deploying the Backend on Render
1. Create a new "Web Service" in Render connected to your GitHub repository.
2. Select the `backend` folder as your Root Directory.
3. Use the Python environment.
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `uvicorn main:app --host 0.0.0.0 --port 10000`
6. Add an environment variable `DATABASE_URL` pointing to a PostgreSQL instance (you can also provision this on Render).

### Deploying the Frontend on Vercel
1. Import your repository into Vercel.
2. Select the `frontend` folder as your Root Directory.
3. The Build Command (`npm run build`) and Output Directory (`.next`) should be automatically detected.
4. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to your deployed Render backend URL.
5. Deploy.

## How to Add New Projects
To add new projects:
1. Since there is no admin dashboard, you can add projects directly to your PostgreSQL database.
2. Connect to your database and execute an `INSERT` statement into the `projects` table:
   ```sql
   INSERT INTO projects (slug, title, description, content, tags) 
   VALUES ('new-project', 'New Project', 'Short description', 'Long details...', ARRAY['React', 'Node']);
   ```

## Contact Form & CAPTCHA
The contact form is pre-configured to send a token. To fully implement CAPTCHA:
1. Sign up for Google reCAPTCHA v3.
2. Add your Site Key to the frontend and wrap the form with the reCAPTCHA provider to generate tokens on submit.
3. Update `backend/.env` with your `RECAPTCHA_SECRET_KEY`.
4. In `backend/main.py`, verify the token against Google's API before processing the contact message.
