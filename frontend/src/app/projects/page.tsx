import Link from 'next/link';

interface Project {
    slug: string;
    title: string;
    description: string;
}

export default async function ProjectsPage() {
    let projects: Project[] = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/projects`, { cache: 'no-store' });
        if (res.ok) {
            projects = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch projects", error);
        // Fallback data
        projects = [{ slug: "sample-project", title: "Sample Project", description: "This is a sample project when the backend is down." }];
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <h1 className="text-4xl font-extrabold tracking-tight mb-8">My Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Link key={project.slug} href={`/projects/${project.slug}`} className="group block h-full">
                        <div className="h-full border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-900 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                            <h2 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">{project.title}</h2>
                            <p className="text-neutral-600 dark:text-neutral-400 line-clamp-3">{project.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
