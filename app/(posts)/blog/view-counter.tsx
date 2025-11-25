'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ViewCounter({
  slug,
  trackView = true,
}: {
  slug: string;
  trackView?: boolean;
}) {
  const storageKey = `view-count-${slug}`;
  const initial = typeof window !== 'undefined'
    ? Number(sessionStorage.getItem(storageKey)) || null
    : null;

  const { data, mutate } = useSWR(
    initial === null ? `https://kv.kapil.app/kv?key=pageviews,${slug}` : null,
    fetcher,
    {
      revalidateOnMount: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [views, setViews] = useState<number | null>(initial);

  useEffect(() => {
    let stored = initial;

    // 1️⃣ First-time visit in this session: fetch → cache
    if (stored === null && data?.value?.value !== undefined) {
      stored = data.value.value;
      sessionStorage.setItem(storageKey, String(stored));
      setViews(stored);
    }

    // 2️⃣ Increment on every visit (including refresh)
    if (trackView && stored !== null) {
      fetch(`https://kv.kapil.app/kv/sum?key=pageviews,${slug}&value=1`, {
        method: 'POST',
        body: JSON.stringify(10),
      }).then(() => {
        const newValue = stored! + 1;
        sessionStorage.setItem(storageKey, String(newValue));
        setViews(newValue);
        mutate({ value: { value: newValue } }, false); // Sync SWR cache without refetch
      });
    }
  }, [data, slug, trackView]);

  return (
    <span className="text-sm text-neutral-500 animate-flip-up">
      {views ?? '...'} views
    </span>
  );
}
