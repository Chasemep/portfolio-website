export default function Footer() {
    return (
        <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 py-8 mt-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
                <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/chase-pluimer-974b7737b/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-blue-500 transition-colors">LinkedIn</a>
                    <a href="https://github.com/Chasemep" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-blue-500 transition-colors">GitHub</a>
                </div>
                <p className="text-sm text-neutral-500">
                    © {new Date().getFullYear()} My Portfolio. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
