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
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Toaster />
      <button
        disabled={liked}
        onClick={onLike}
        type='button'
        className='flex items-center justify-center h-fit gap-2 overflow-hidden transition-transform bg-[var(--brand)] text-[var(--brandforeground)] disabled:bg-[var(--muted)] disabled:text-[var(--primary)] rounded-lg hover:cursor-pointer w-fit cursor-pointer absolute transform hover:scale-x-110 hover:scale-y-105 duration-200 ease-out'
      >
        <Halo
          className='flex items-center justify-between gap-2 px-4 py-2'
          size={120}
          strength={30}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              {liked ? <HeartFilledIcon /> : <HeartIcon />}
              <span className=''>
                {" "}
                {Number(like)} {Number(like) > 1 ? "likes" : "like"}
              </span>
            </>
          )}
        </Halo>
      </button>
    </>
  );
}
