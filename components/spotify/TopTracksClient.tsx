"use client";

// Credit of styles of music bars to  https://harshsingh.xyz/ and main idea of https://leerob.io/

import fetcher from "lib/fetcher";
import useSWR from "swr";
import { TopTracks } from "types";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Track = dynamic(() => import("./Track"));
export default function TopTracksClient() {
  const { data } = useSWR<TopTracks>("/api/spotify/top-tracks", fetcher);

  if (!data) {
    return null;
  }
  // console.log(data);
  return (
    <>
      <Suspense>
        {data.tracks.map((track, index) => (
          <Track ranking={index + 1} key={track.songUrl} {...track} />
        ))}
      </Suspense>
    </>
  );
}
