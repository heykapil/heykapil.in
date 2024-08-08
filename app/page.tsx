import clsx from 'clsx';
import styles from './Music.module.css';
import { Suspense } from 'react';
import { Session } from 'app/components/helpers/session';
export default async function Page() {
  const birthdayData = await getBirthdayData();
  const spotifyData = await getSpotifyData();
  const uptimeData = await getUptimeStatus();
  const session = await Session();
  let isDown = uptimeData.state.regions?.se_asia?.status !== 'UP';
  // ||
  // uptimeData.state.regions?.eu_west?.status !== "UP" ||
  // uptimeData.state.regions?.us_east?.status !== "UP" ||
  // uptimeData.state.regions?.us_west?.status !== "UP";
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter animate-fade-right">
        hey, I'm kapil 👋
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        <Suspense fallback={null}>
          {`I'm a ${birthdayData.years} old research scholar at Gujarat university. I am currently working as Junior Research Fellow in the area of
              fractional-order dynamical systems and epidemiology. `}
        </Suspense>
        {`My suporvisior is `}
        <a
          href="https://scholar.google.com/citations?hl=en&user=ngfCbC8AAAAJ"
          className=""
          target="_blank"
        >
          Prof. Nita H. Shah.
        </a>
        {` I am being funded by `}
        <span className="not-prose">
          <Badge href="https://csirhrdg.res.in">CSIR-HRDG.</Badge>
        </span>
      </p>
      <p className="prose prose-neutral dark:prose-invert"></p>
      <div className="columns-2 sm:columns-3 gap-4 my-8">
        <div className="relative h-40 mb-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <Suspense fallback={null}>
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 w-full h-full p-5 rounded-lg">
              {birthdayData && birthdayData.daysLeft > 0 ? (
                <div className=" items-center content-center place-content-center text-center">
                  <p className="text-4xl mt-[15%] animate-fade-up">
                    {birthdayData.daysLeft}{' '}
                    <span className="text-lg">days</span>
                  </p>
                  <p className="text-lg">until birthday</p>
                </div>
              ) : (
                <div className=" items-center content-center place-content-center text-center">
                  <p className="mt-[20%] text-lg">
                    Dear Kapil 🎂🎉 Happy birthday!
                  </p>
                </div>
              )}
            </div>
          </Suspense>
        </div>
        <div className="relative flex h-80 mb-4 sm:mb-0 hover:scale-[1.025] duration-200 transition easy-in-out ">
          <Suspense>
            <div className="flex-1 align-stretch min-h-0 items-center justify-center p-3 dark:hover:bg-neutral-700 bg-neutral-100 hover:bg-neutral-200 delay-50 duration-100 dark:bg-neutral-800 rounded-lg group">
              <img
                src={spotifyData.cover || spotifyData.albumImageUrl}
                className="w-full mb-2 rounded shadow bg-fill"
              />
              <div className={clsx(styles.music)}>
                <div
                  className={clsx(
                    styles.line,
                    styles.line1,
                    spotifyData?.isPlaying === false && styles.offline,
                  )}
                />
                <div
                  className={clsx(
                    styles.line,
                    styles.line2,
                    spotifyData?.isPlaying === false && styles.offline,
                  )}
                />
                <div
                  className={clsx(
                    styles.line,
                    styles.line3,
                    spotifyData?.isPlaying === false && styles.offline,
                  )}
                />
                {spotifyData.isPlaying === false ? (
                  <p className="hidden sm:flex">Last played</p>
                ) : (
                  <p className="hidden sm:flex">playing on spotify</p>
                )}
              </div>
              <a
                className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 hover:underline transition-all mt-1"
                href={spotifyData.songUrl}
              >
                <ArrowIcon />
                <p className="font-semibold mt-1 h-7 ml-2">
                  {spotifyData.title}
                </p>
              </a>
              <p className="font-light mt-2 text-sm">
                {spotifyData.album} - {spotifyData.artist}
              </p>
            </div>
          </Suspense>
        </div>
        <div className="relative h-40 sm:h-80 sm:mb-4">
          <img
            alt="Garden of five sense"
            src="https://bkpl5hem.dev.cdn.imgeng.in/images/kapiljch-20220503-0008.jpg"
            sizes="(max-width: 768px) 213px, 33vw"
            placeholder="blur"
            //  blurDataURL="data:image/webp;base64,UklGRhgCAABXRUJQVlA4WAoAAAAgAAAAAQAAAQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggKgAAALABAJ0BKgIAAgADgFoliAJ0AQ72nkAAzj72ZirViMtD3z7F/qqnr8PoAA=="
            className="rounded-lg object-cover h-full w-full absolute object-top sm:object-center"
            loading="lazy"
          />
        </div>
        <div className="relative h-40 mb-4 sm:mb-0">
          <img
            alt=""
            src="https://bkpl5hem.dev.cdn.imgeng.in/images/kapiljch-20221120.webp"
            sizes="(max-width: 768px) 213px, 33vw"
            placeholder="blur"
            // blurDataURL="data:image/webp;base64,UklGRhgCAABXRUJQVlA4WAoAAAAgAAAAAQAAAQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggKgAAALABAJ0BKgIAAgADgFoliAJ0AQ72nkAAzj72ZirViMtD3z7F/qqnr8PoAA=="
            className="rounded-lg absolute h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="relative h-40 mb-4">
          <img
            alt="Garden of five senses"
            src="https://bkpl5hem.dev.cdn.imgeng.in/images/kapiljch-20220503-0001.jpg"
            sizes="(max-width: 768px) 213px, 33vw"
            placeholder="blur"
            // blurDataURL="data:image/webp;base64,UklGRhgCAABXRUJQVlA4WAoAAAAgAAAAAQAAAQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggKgAAALABAJ0BKgIAAgADgFoliAJ0AQ72nkAAzj72ZirViMtD3z7F/qqnr8PoAA=="
            className="rounded-lg absolute h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="relative h-80">
          <img
            alt=""
            src="https://bkpl5hem.dev.cdn.imgeng.in/images/kapiljch-20221008.jpeg"
            sizes="(min-width: 768px) 213px, 33vw"
            placeholder="blur"
            // blurDataURL="data:image/webp;base64,UklGRhgCAABXRUJQVlA4WAoAAAAgAAAAAQAAAQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggKgAAALABAJ0BKgIAAgADgFoliAJ0AQ72nkAAzj72ZirViMtD3z7F/qqnr8PoAA=="
            className="rounded-lg absolute h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          On the tech side, I'm a dedicated self-taught developer, crafting
          interactive and dynamic web applications for fun. My expertise extends
          to Typescript, Tailwindcss, Chakra, Shadcn, React, Next.js, Auth.js,
          and PostgreSQL.
          {/* This website is inspired from the blog of{" "}
          <Link href="//leerob.io" prefetch={false}>
            leerob
          </Link>{" "}
          (kept his same minimal look without much customizations except some
          APIs and xata database). */}
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
      {/* <div className="my-8 flex flex-col space-y-4 w-full"> */}
      {/* <BlogLink
          name="What Makes A Great Developer Experience?"
          slug="developer-experience-examples"
        />
        <BlogLink name="What is Developer Relations?" slug="devrel-at-vercel" />
        <BlogLink name="The Story of Heroku" slug="heroku" /> */}
      {/* </div> */}
      {/* <div className="prose prose-neutral dark:prose-invert">
        <p>
          I've worked with and advised companies on developer marketing,{" "}
          <Link href="/blog/devrel-at-vercel">developer relations</Link>,
          building open-source communities, product-led growth, and more.
        </p>
      </div> */}
      <div className="flex justify-between">
        <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
          <li>
            <a
              className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
              rel="noopener noreferrer"
              // target="_blank"
              href={
                session?.id
                  ? 'https://kapil.app/signout?callback=/'
                  : 'https://kapil.app/signin?callback=/admin'
              }
            >
              <ArrowIcon />
              <p className="h-7 ml-2">{session?.id ? 'logout' : 'login'}</p>
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
          <li>
            <a
              className="flex items-baseline hover:text-neutral-800 dark:hover:text-neutral-100 space-x-2 transition-all"
              rel="noopener noreferrer"
              target="_blank"
              href="https://status.kapil.app"
            >
              <Suspense fallback={<p className="h-7"></p>}>
                <p className="flex items-center h-7">
                  <span className="relative flex h-4 w-4">
                    <span
                      className={clsx(
                        isDown ? 'bg-red-500' : 'bg-green-500',
                        'animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75',
                      )}
                    ></span>
                    <span
                      className={clsx(
                        isDown ? 'bg-red-500' : 'bg-green-500',
                        'relative inline-flex rounded-full h-4 w-4',
                      )}
                    ></span>
                  </span>
                  <span className="w-2 animate-fade-up"></span>
                  {uptimeData.state
                    ? uptimeData.state.regions.se_asia
                        .thirty_day_uptime_percentage
                    : null}
                  % ↑{' '}
                </p>
              </Suspense>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

async function getBirthdayData() {
  try {
    const res = await fetch(`https://api.kapil.app/api/birthday`, {
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch (error: any) {
    throw new Error('Failed to fetch birthday data');
  }
}

async function getUptimeStatus() {
  try {
    const res = await fetch(`https://api.kapil.app/api/uptime`, {
      next: { revalidate: 3600 },
    });
    return res.json();
  } catch (error: any) {
    throw new Error('Failed to fetch uptime data');
  }
}

async function getSpotifyData() {
  try {
    const res = await fetch(`https://api.kapil.app/api/spotify/now-playing`, {
      next: { revalidate: 60 },
    });
    return res.json();
  } catch (error: any) {
    throw new Error('Failed to fetch spotify data');
  }
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

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
    />
  );
}
