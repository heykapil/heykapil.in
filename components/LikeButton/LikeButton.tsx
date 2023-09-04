"use client";
import { useEffect, useState } from "react";
import { safeLocalStorage as localStorage } from "lib/localstorage";
import { incrementlike } from "@/lib/actions";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import Halo from "../Halo";
import toast, { Toaster } from "react-hot-toast";
export default function LikeButton({
  slug,
  allLikes, //   track,
}: {
  slug: string;
  allLikes: {
    slug: string;
    count: number;
  }[];
}) {
  const likesForSlug = allLikes && allLikes.find((like) => like.slug === slug);
  const number = new Number(likesForSlug?.count || 0);
  const [like, setLike] = useState(Number(number));
  const [isLoading, setisLoading] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [mounted, setMounted] = useState(false);
  const liked = localStorage.getItem(slug) === "true";
  const onLike = async () => {
    // setEmoji(true);
    setisLoading(true);
    await incrementlike(slug);
    setLike(Number(like) + 1);
    localStorage.setItem(slug, "true");
    toast.success(`You liked this!`, {
      duration: 2000,
      icon: "❤️",
    });
    setisLoading(false);
    setEmoji(true);
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Toaster />
      <div className='relative'>
        <div className='absolute w-full items-center justify-center -right-10 animate-[emoji_1s_ease-out] text-center opacity-0'>
          {emoji ? "🔥" : "❤️"}
        </div>
        <button
          disabled={liked}
          onClick={onLike}
          type='button'
          className='flex items-center justify-center h-fit gap-2 overflow-hidden transition-transform bg-[var(--brand)] text-[var(--brandforeground)] disabled:bg-[var(--muted)] disabled:text-[var(--primary)] rounded-lg hover:cursor-pointer w-fit cursor-pointer absolute transform hover:scale-x-110 hover:scale-y-105 duration-200 ease-out'
        >
          <Halo
            className='flex flex-row items-center justify-between gap-2 px-4 py-2'
            size={120}
            strength={30}
          >
            {isLoading ? (
              <>
                <svg
                  className='animate-spin h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-0'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-70'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
              </>
            ) : (
              <>
                <span className='flex items-center flex-row justify-between space-x-1'>
                  {liked ? (
                    <HeartFilledIcon className='' />
                  ) : (
                    <HeartIcon className='' />
                  )}
                  <span> {Number(like)}</span>
                  <span> {Number(like) > 1 ? "likes" : "like"}</span>
                </span>
              </>
            )}
          </Halo>
        </button>
      </div>
    </>
  );
}
