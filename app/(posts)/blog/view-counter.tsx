'use client';

import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ViewCounter({
  slug,
  trackView,
}: {
  slug: string;
  trackView?: boolean;
}) {
  const { data, mutate } = useSWR(
    `https://kv.kapil.app/kv?key=pageviews,${slug}`,
    fetcher,
  );
  const views = data?.value?.value || '+1';

  useEffect(() => {
    if (trackView) {
      fetch(`https://kv.kapil.app/kv/sum?key=pageviews,${slug}&value=1`, {
        method: 'POST',
        body: JSON.stringify(10),
      }).then(() => {
        mutate();
      });
    }
  }, [slug, trackView, mutate]);

  return (
    <span className="text-sm text-neutral-500 animate-flip-up">
      {views} views
    </span>
  );
}
