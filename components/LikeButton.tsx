"use client";
import { useEffect, useState } from "react";
import { safeLocalStorage as localStorage } from "lib/localstorage";
import { incrementlike } from "@/lib/actions";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";

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
    <div className='flex justify-center'>
      <button
        disabled={liked}
        onClick={(e) => {
          localStorage.setItem(slug, "true");
          onLike();
          e.preventDefault();
          history.go(0);
        }}
        type='button'
        className='flex items-center justify-center h-10 gap-2 overflow-hidden p-2 text-white transition-transform bg-[var(--offset2)] rounded-full like-button hover:cursor-pointer w-40 bg-rose-500 shadow-2xl cursor-pointer absolute transform hover:scale-x-110 hover:scale-y-105 duration-300 ease-out'
      >
        {/* <Halo
          className='flex items-center justify-center gap-2 px-4'
          size={120}
          strength={30}
        > */}
        {liked ? <HeartFilledIcon /> : <HeartIcon />}{" "}
        {`${number.toLocaleString()}`} likes
        {/* </Halo> */}
      </button>
    </div>
  );
}
