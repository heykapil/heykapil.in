"use client";
import * as React from "react";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";
// import { Spinner } from "../Spinner";
export default function PlayPauseButton({ audioUrl }: { audioUrl?: string }) {
  const [isReady, setIsReady] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };
  return (
    <>
      <audio
        ref={audioRef}
        preload='metadata'
        onCanPlay={() => {
          setIsReady(true);
        }}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={audioUrl} />
      </audio>
      {audioUrl ? (
        <>
          <button
            disabled={!isReady}
            onClick={togglePlayPause}
            className='transition mr-2 duration-300 group-hover:scale-[1.2] rounded-lg scale-100 blur-0 grayscale-0'
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {!isReady ? (
              //   <Spinner />
              ""
            ) : isPlaying ? (
              <PauseIcon className='w-5 h-5 text-red-500' />
            ) : (
              <>
                <PlayIcon className='w-5 h-5 text-green-500' />
              </>
            )}
          </button>
        </>
      ) : null}
    </>
  );
}
