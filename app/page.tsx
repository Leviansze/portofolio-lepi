export default function Home() {
  return (
    <>
      <nav className="p-8 background-white dark:background-black">
        <ul className="flex justify-between">
          <div className="flex space-x-8">
            <li>
              <a 
              className="border-2 border-black dark:border-white bg-white dark:bg-black px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0" 
              href="#">
                Profile
              </a>
            </li>
            <li>
              <a 
              className="border-2 border-black dark:border-white bg-white dark:bg-black px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0" 
              href="#">
                Projects
              </a>
            </li>
            <li>
              <a 
              className="border-2 border-black dark:border-white bg-white dark:bg-black px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0" 
              href="#">
                Certificates
              </a>
            </li>
            <li>
              <a 
              className="border-2 border-black dark:border-white bg-white dark:bg-black px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-yellow-300 focus:outline-0" 
              href="#">
                Social Media & Contact
              </a>
            </li>
          </div>
          <li>
            <a 
            className="end-6 top-4 border-2 border-black dark:border-white bg-red-500 px-5 py-3 font-semibold text-black dark:text-white shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-[-1px_-1px_0_0] focus:ring-2 focus:ring-red-300 focus:outline-0" 
            href="#">
              💀 Don&apos;t Click Me
            </a>
          </li>
        </ul>
      </nav>
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg">This is a simple portfolio website built with Next.js and Tailwind CSS.</p>
      </main>
    </>
  );
}
