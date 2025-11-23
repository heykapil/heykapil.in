'use client';

import clsx from 'clsx';
import Image from 'next/image';
import useSWR from 'swr';
import styles from '../Music.module.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HomeStats() {
    const { data: birthdayData } = useSWR(
        'https://api.kapil.app/api/birthday',
        fetcher
    );
    const { data: spotifyData } = useSWR(
        'https://api.kapil.app/api/spotify/now-playing',
        fetcher,
        { refreshInterval: 60000 }
    );
    const { data: uptimeData } = useSWR(
        'https://api.kapil.app/api/uptime',
        fetcher
    );

    return (
        <>
            <p className="prose prose-neutral dark:prose-invert">
                {`I'm a ${birthdayData?.years || '...'
                    } old research scholar at Gujarat university. I am currently working as Senior Research Fellow in the area of
              fractional-order dynamical systems and epidemiology. `}
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
                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 w-full h-full p-5 rounded-lg">
                        {birthdayData && birthdayData.daysLeft > 0 ? (
                            <div className=" items-center content-center place-content-center text-center">
                                <p className="text-4xl mt-[15%] animate-fade-up">
                                    {birthdayData.daysLeft} <span className="text-lg">days</span>
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
                </div>
                <div className="relative flex h-80 mb-4 sm:mb-0 hover:rounded-lg">
                    {spotifyData && (
                        <div className="flex-1 align-stretch min-h-0 items-center justify-center p-3 dark:hover:bg-neutral-700 bg-neutral-100 hover:bg-neutral-200 delay-50 duration-100 dark:bg-neutral-800 rounded-lg hover:rounded-lg group-hover:rounded-lg group hover:scale-[1.025] transition easy-in-out">
                            <Image
                                src={spotifyData.cover || spotifyData.albumImageUrl}
                                className="w-full mb-2 rounded shadow bg-fill"
                                alt="Spotify cover"
                                width={213}
                                height={213}
                                sizes="(max-width: 768px) 213px, 33vw"
                                priority
                            />
                            <div className={clsx(styles.music)}>
                                <div
                                    className={clsx(
                                        styles.line,
                                        styles.line1,
                                        spotifyData?.isPlaying === false && styles.offline
                                    )}
                                />
                                <div
                                    className={clsx(
                                        styles.line,
                                        styles.line2,
                                        spotifyData?.isPlaying === false && styles.offline
                                    )}
                                />
                                <div
                                    className={clsx(
                                        styles.line,
                                        styles.line3,
                                        spotifyData?.isPlaying === false && styles.offline
                                    )}
                                />
                                {spotifyData.isPlaying === false ? (
                                    <p className="hidden sm:flex text-[#737373] font-semibold">
                                        Last played
                                    </p>
                                ) : (
                                    <p className="hidden sm:flex">Playing now...</p>
                                )}
                            </div>
                            <a
                                className={clsx(
                                    'flex items-center hover:underline transition-all mt-1',
                                    spotifyData.isPlaying === false
                                        ? 'text-[#737373]'
                                        : 'text-[#1DB954]'
                                )}
                                href={spotifyData.songUrl}
                            >
                                <p className="font-semibold mt-1 text-sm h-6 mr-2 text-clip overflow-hidden">
                                    {spotifyData.title}
                                </p>
                                <ArrowIcon />
                            </a>
                            <p
                                className={clsx(
                                    'font-light mt-2 text-xs text-clip overflow-hidden',
                                    spotifyData.isPlaying === false && 'text-[#737373]'
                                )}
                            >
                                {spotifyData.album} - {spotifyData.artist}
                            </p>
                        </div>
                    )}
                </div>
                <div className="relative h-40 sm:h-80 sm:mb-4">
                    <Image
                        alt="Garden of five sense"
                        src="https://cf.kapil.app/images/kapiljch-20220503-0008.jpg"
                        sizes="(max-width: 768px) 213px, 33vw"
                        className="rounded-lg object-cover h-full w-full absolute object-top sm:object-center"
                        priority
                        fill
                    />
                </div>
                <div className="relative h-40 mb-4 sm:mb-0">
                    <Image
                        alt="Department of Mathematics, Gujarat University, Ahmedabad"
                        src="https://cf.kapil.app/images/kapiljch-20221120.webp"
                        sizes="(max-width: 768px) 213px, 33vw"
                        className="rounded-lg absolute h-full w-full object-cover"
                        priority
                        fill
                    />
                </div>
                <div className="relative h-40 mb-4">
                    <Image
                        alt="Musmuna Village"
                        src="https://cf.kapil.app/images/kapiljch-20220503-0001.jpg"
                        sizes="(max-width: 768px) 213px, 33vw"
                        className="rounded-lg absolute h-full w-full object-cover"
                        priority
                        fill
                    />
                </div>
                <div className="relative h-80">
                    <Image
                        alt="Gujarat University, Ahmedabad"
                        src="https://cf.kapil.app/images/kapiljch-20221008.jpeg"
                        sizes="(min-width: 768px) 213px, 33vw"
                        className="rounded-lg absolute h-full w-full object-cover"
                        fill
                        priority
                    />
                </div>
            </div>
        </>
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

function Badge(props: any) {
    return (
        <a
            {...props}
            target="_blank"
            className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
        />
    );
}
