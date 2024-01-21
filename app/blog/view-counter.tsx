"use client";

import { useEffect } from "react";
import { increment } from "app/db/actions";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  useEffect(() => {
    if (trackView) {
      increment(slug);
    }
    router.refresh();
  }, [slug]);
  return <p>{`${number.toLocaleString()}`} views</p>;
}
