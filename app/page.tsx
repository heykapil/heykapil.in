import HomeStats from 'app/components/home-stats';

export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter animate-fade-right">
        hey, I'm kapil 👋
      </h1>
      <HomeStats />
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          On the tech side, I'm a dedicated self-taught developer, crafting
          interactive and dynamic web applications for fun. My expertise extends
          to Typescript, Tailwindcss, Chakra, Shadcn, React, Next.js, Auth.js,
          and PostgreSQL.
        </p>
      </div>
      <div className="my-8 flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 w-full"></div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Thank you for visiting, and I hope you enjoy your time exploring the
          diverse facets of my interests. Happy browsing! Follow me on social
          media for the latest updates on my projects, research, and insights.
          Don't miss out to checkout the guestbook!
        </p>
      </div>
      <div className="flex justify-between">
        <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
          <li>
            <a
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
              rel="noopener noreferrer"
              // target="_blank"
              href={'https://kapil.app/signin?callback=/admin'}
            >
              <ArrowIcon />
              <p className="h-7 ml-2">admin</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://notes.kapil.app"
            >
              <ArrowIcon />
              <p className="h-7 ml-2">notes</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="mailto:hi@kapil.app"
            >
              <ArrowIcon />
              <p className="h-7 ml-2">email</p>
            </a>
          </li>
        </ul>
        <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
          <li className="md:hidden">
            <a
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://gallary.kapil.app"
            >
              <ArrowIcon />
              <p className="h-7 ml-2">gallary</p>
            </a>
          </li>
          <li className="md:hidden">
            <a
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://x.com/kapiljch"
            >
              <ArrowIcon />
              <p className="h-7 ml-2">twitter</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}
