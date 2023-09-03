import { getTopTracks } from "lib/spotify";
import { NextResponse } from "next/server";

export type Artist = {
  id: string;
  name: string;
  type: string;
  href: string;
};

// type Track = {
//   artists: Artist[];
//   external_urls: { spotify: string };
//   name: string;
// };

export async function GET() {
  const response = await getTopTracks();
  const { items } = await response.json();

  // const tracks = items.slice(0, 10).map((track: Track) => ({
  //   artist: track.artists.map((_artist) => _artist.name).join(", "),
  //   songUrl: track.external_urls.spotify,
  //   title: track.name,
  // }));

  return NextResponse.json({ items });
}
