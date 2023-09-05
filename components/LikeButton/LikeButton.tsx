"use client";
import { useEffect, useState } from "react";
import { safeLocalStorage as localStorage } from "lib/localstorage";
import { incrementlike } from "@/lib/actions";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import Halo from "../Halo";
import { Spinner } from "../Spinner";
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
  const likesForSlug =
    allLikes && allLikes.find((param) => param.slug === slug);
  const number = new Number(likesForSlug?.count || 0);
  const [like, setLike] = useState(Number(number));
  const [isLoading, setisLoading] = useState(false);
  // const [emoji, setEmoji] = useState(false);
  const [mounted, setMounted] = useState(false);
  const liked = localStorage.getItem(slug) === "true";
  const onLike = async () => {
    setisLoading(true);
    await incrementlike(slug);
    setLike(Number(like) + 1);
    localStorage.setItem(slug, "true");
    toast.success(`You liked this!`, {
      duration: 2000,
      icon: "❤️",
    });
    setisLoading(false);
    // setEmoji(true);
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Toaster />
      <div className='relative'>
        <div className='absolute w-full items-center justify-center -right-5 animate-[emoji_2s_ease-out_infinite] text-center opacity-0'>
          {liked ? "🙏" : "💕"}
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
              <Spinner />
            ) : (
              <>
                <span className='flex items-center flex-row justify-between space-x-1'>
                  {liked ? (
                    <HeartFilledIcon className='text-red-500 w-4 h-5' />
                  ) : (
                    <HeartIcon className='w-4 h-5' />
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
