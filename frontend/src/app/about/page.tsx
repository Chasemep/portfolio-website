export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight mb-8">About Me</h1>
            <div className="space-y-6 text-lg text-neutral-700 dark:text-neutral-300">
                <p>
                    I am a versatile developer with a foundational background in solving complex problems. I enjoy working across the stack,
                    from architecting scalable backends to crafting polished, responsive user interfaces.
                </p>
                <p>
                    My core competencies span across Software Engineering, Machine Learning, and Data Science. I'm always eager to learn new technologies and apply them to real-world scenarios.
                </p>
                <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Resume</h2>
                    <p className="mb-4">You can download a copy of my resume for a comprehensive list of my experiences and skills.</p>
                    <a
                        href="/resume.pdf"
                        download
                        className="inline-block px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Download Resume (PDF)
                    </a>
                </div>
            </div>
        </div>
    );
}
