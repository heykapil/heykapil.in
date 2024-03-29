"use client";

import { useEffect } from "react";
import { incrementview } from "lib/actions";
export default function ViewCounter({
  slug,
  allViews,
  trackView,
}: {
  slug: string;
  allViews: {
    slug: string;
    count: number;
  }[];
  trackView?: boolean;
}) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug);
  const number = new Number(viewsForSlug?.count || 0);

  useEffect(() => {
    if (trackView) {
      incrementview(slug);
    }
  }, []);

  return <>{`${number.toLocaleString()}`}</>;
}
