import { notFound } from 'next/navigation';

interface ProjectDetail {
    slug: string;
    title: string;
    content: string;
    tags?: string[];
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let project: ProjectDetail | null = null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/projects/${slug}`, { cache: 'no-store' });
        if (res.ok) {
            project = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch project detail", error);
    }

    if (!project) {
        if (slug === "sample-project") {
            project = { slug: "sample-project", title: "Sample Project", content: "Detailed content here.", tags: ["React", "Python"] };
        } else {
            notFound();
        }
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{project.title}</h1>
            {project.tags && (
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">{project.content}</p>
            </div>
        </div>
    );
}
