import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    Port<span className="text-blue-500">folio</span>
                </Link>
                <div className="flex gap-6">
                    <Link href="/projects" className="text-sm font-medium hover:text-blue-500 transition-colors">Projects</Link>
                    <Link href="/about" className="text-sm font-medium hover:text-blue-500 transition-colors">About</Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-blue-500 transition-colors">Contact</Link>
                </div>
            </div>
        </nav>
    );
}
