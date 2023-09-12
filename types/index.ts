import { ReactNode } from "react";
import { MotionValue } from "framer-motion";

export type DockContextType = {
  hovered: boolean;
  width: number | undefined;
};

export type DockItemProps = {
  key?: string;
  id?: string;
  children?: ReactNode;
};

export type IconProps = {
  className?: string;
  height?: string | number;
  width?: string | number;
};

export type MouseType = {
  position: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  velocity: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
  preview_url: string;
};

export type Song = {
  songUrl: string;
  audioUrl: string;
  artist: string;
  title: string;
  isPlaying: boolean;
};

export type TopTracks = {
  tracks: Song[];
};

export type Artist = {
  id: string;
  name: string;
  type: string;
  href: string;
};

export type Track = {
  artists: Artist[];
  external_urls: { spotify: string };
  name: string;
  preview_url: string;
  album: { images: any };
};
