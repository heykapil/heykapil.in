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
    { revalidateOnMount: false }
  );
  const views = data?.value?.value || '+1';

  useEffect(() => {
    const storageKey = `view-count-${slug}`;
    const cachedViews = typeof window !== 'undefined' && sessionStorage.getItem(storageKey);

    if (cachedViews) {
      mutate({ value: { value: parseInt(cachedViews) } }, false);
    } else {
      mutate();
    }

    if (trackView) {
      fetch(`https://kv.kapil.app/kv/sum?key=pageviews,${slug}&value=1`, {
        method: 'POST',
        body: JSON.stringify(10),
      }).then(async (res) => {
        const result = await res.json();
        const currentViews = cachedViews ? parseInt(cachedViews) : (data?.value?.value ? parseInt(data.value.value) : 0);
        const newViews = currentViews + 1;

        if (!isNaN(newViews)) {
          mutate({ value: { value: newViews } }, false);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(storageKey, newViews.toString());
          }
        } else {
          mutate();
        }
      });
    }
  }, [slug, trackView, mutate]);

  return (
    <span className="text-sm text-neutral-500 animate-flip-up">
      {views} views
    </span>
  );
}
