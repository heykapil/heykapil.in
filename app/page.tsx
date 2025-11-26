import AnimatedLogo from './components/logo/animated';

export default function Page() {
  return (
    <section className="max-w-2xl mx-auto font-sans">
      {/* Header / Intro */}
      <header className="mb-12">
        <AnimatedLogo className="w-20 h-20" />
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Research Scholar at Gujarat University & Self-taught Developer.
        </p>
      </header>

      {/* Bio */}
      <div className="prose prose-neutral dark:prose-invert mb-12">
        <p>
          I'm a research scholar at Gujarat University, currently working as a
          Senior Research Fellow in the area of fractional-order dynamical
          systems and epidemiology. My supervisor is Dr. Nita H. Shah. I am
          being funded by CSIR-HRDG.
        </p>
        <p>
          On the tech side, I'm a dedicated self-taught developer, crafting
          interactive and dynamic web applications for fun. My expertise extends
          to Typescript, Tailwindcss, Chakra, Shadcn, React, Next.js, Auth.js,
          and PostgreSQL.
        </p>
      </div>

      {/* Research Section */}
      <div className="mb-12">
        <h2 className="font-medium text-xl tracking-tighter mb-4">Research</h2>
        <ul className="flex flex-col space-y-2 text-neutral-600 dark:text-neutral-400">
          <li>
            <a
              href="#"
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
            >
              <ArrowIcon />
              <span className="ml-2">
                Thesis (
                <a
                  href="https://latex.kapil.app/read/rgrjpkrrrcgb#e685b2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </a>
                )
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
            >
              <ArrowIcon />
              <span className="ml-2">Papers (Coming Soon)</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
            >
              <ArrowIcon />
              <span className="ml-2">Google Scholar Profile (Coming Soon)</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Connect / Links Section */}
      <div>
        <h2 className="font-medium text-xl tracking-tighter mb-4">Connect</h2>
        <div className="flex flex-wrap gap-4 text-neutral-600 dark:text-neutral-400">
          <a
            href="mailto:hi@kapil.app"
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
          >
            <ArrowIcon />
            <span className="ml-2">Email</span>
          </a>
          <a
            href="https://x.com/kapiljch"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
          >
            <ArrowIcon />
            <span className="ml-2">Twitter</span>
          </a>
          <a
            href="https://ritul.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
          >
            <ArrowIcon />
            <span className="ml-2">Gallery</span>
          </a>
          <a
            href="https://notes.kapil.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
          >
            <ArrowIcon />
            <span className="ml-2">Notes</span>
          </a>
          <a
            href="https://auth.kapil.app/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
          >
            <ArrowIcon />
            <span className="ml-2">Admin</span>
          </a>
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert mt-12 text-sm text-neutral-500">
        <p>
          Thank you for visiting. Happy browsing! Don't miss out to checkout the
          guestbook!
        </p>
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
