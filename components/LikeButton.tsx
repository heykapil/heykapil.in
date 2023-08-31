"use client";
import { useEffect, useState } from "react";
import { safeLocalStorage as localStorage } from "lib/localstorage";
import { incrementlike } from "@/lib/actions";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import Halo from "./Halo";
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

  const [mounted, setMounted] = useState(false);

  const liked = localStorage.getItem(slug) === "true";
  const onLike = async () => {
    localStorage.setItem(slug, "true");
    await incrementlike(slug);
  };

  //   const onLike = useEffect(() => {
  //     async () => {
  //       await incrementlike(slug);
  //     };
  //     setMounted(true);
  //     localStorage.setItem(slug, "true");
  //   }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <button
        disabled={liked}
        onClick={onLike}
        type='button'
        className='flex items-center justify-center h-fit gap-2 overflow-hidden transition-transform bg-[var(--offset2)] rounded-lg like-button hover:cursor-pointer w-fit cursor-pointer absolute transform hover:scale-x-110 hover:scale-y-105 duration-200 ease-out'
      >
        <Halo
          className='flex items-center justify-between gap-2 px-4 py-2'
          size={120}
          strength={30}
        >
          {liked ? <HeartFilledIcon /> : <HeartIcon />}
          <span className=''>
            {" "}
            {`${number.toLocaleString()}`}{" "}
            {Number(number) > 1 ? "likes" : "like"}
          </span>
        </Halo>
      </button>
    </>
  );
}
