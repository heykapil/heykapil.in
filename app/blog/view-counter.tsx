"use client";

import { useEffect } from "react";
import { increment } from "app/db/actions";
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
      increment(slug);
    }
  }, []);

  return (
    <p className="text-gray-600 dark:text-gray-400">
      {`${number.toLocaleString()}`} views
    </p>
  );
}
