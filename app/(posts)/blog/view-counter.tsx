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

  const sessionValue =
    typeof window !== 'undefined'
      ? Number(sessionStorage.getItem(storageKey)) || null
      : null;

  // If we have no session cache, fetch. If we DO have it, never fetch.
  const shouldFetch = sessionValue === null;

  const { data } = useSWR(
    shouldFetch ? `https://kv.kapil.app/kv?key=pageviews,${slug}` : null,
    fetcher,
    {
      revalidateOnMount: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [views, setViews] = useState<number | null>(sessionValue);

  // Handle first-time fetch and increments
  useEffect(() => {
    let current = sessionValue;

    async function run() {
      // 1️⃣ First visit: fetch from API
      if (current === null && data?.value?.value != null) {
        current = data.value.value;
        sessionStorage.setItem(storageKey, String(current));
        setViews(current);
      }

      // If still null, data not loaded yet → wait for next render
      if (current === null) return;

      // 2️⃣ Always increment on visit/refresh
      if (trackView) {
        await fetch(
          `https://kv.kapil.app/kv/sum?key=pageviews,${slug}&value=1`,
          { method: 'POST', body: JSON.stringify(10) }
        );

        const updated = current + 1;
        sessionStorage.setItem(storageKey, String(updated));
        setViews(updated);
      }
    }

    run();
  }, [data, slug, trackView]);

  return (
    <span className="text-sm text-neutral-500 animate-flip-up">
      {views ?? '...'} views
    </span>
  );
}
