CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (slug, title, description, content, tags)
VALUES (
    'website-portfolio',
    'Website Portfolio',
    'A personal portfolio website built with Next.js and FastAPI.',
    'Detailed description of the portfolio app architecture and how it leverages Next.js App Router for frontend and FastAPI for high-performance backend APIs.',
    ARRAY['Next.js', 'React', 'FastAPI', 'Python', 'Tailwind CSS']
) ON CONFLICT (slug) DO NOTHING;
