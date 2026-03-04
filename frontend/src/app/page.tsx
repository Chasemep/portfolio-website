import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 text-center bg-white/50 dark:bg-neutral-900/50 p-12 rounded-3xl shadow-xl backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Hi, I'm <span className="text-blue-500">Chase</span>
        </h1>
        <p className="mt-6 text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          I'm an ambitious developer specializing in Software Engineering, Data Science, ML Engineering, and Full Stack Development. Let's create innovative solutions together.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <Link href="/projects" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-blue-500/25">
            View Projects
          </Link>
          <Link href="/about" className="px-8 py-4 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold rounded-full transition-all">
            More About Me
          </Link>
        </div>
      </div>

      {/* Quick Skills Section */}
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full text-center">
        {['Software Engineering', 'Machine Learning', 'Data Science', 'Full Stack'].map((skill) => (
          <div key={skill} className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 hover:-translate-y-1 transition-transform cursor-default">
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">{skill}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
