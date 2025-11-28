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
  const [views, setViews] = useState<number | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data } = useSWR(
    shouldFetch ? `https://kv.kapil.app/kv?key=pageviews,${slug}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  useEffect(() => {
    const storageKey = `view-count-${slug}`;

    async function init() {
      // Check session storage
      const cached = sessionStorage.getItem(storageKey);

      if (cached) {
        const cachedVal = parseInt(cached, 10);
        if (!isNaN(cachedVal)) {
          setViews(cachedVal);

          if (trackView) {
            // Increment in background if cached
            await fetch(
              `https://kv.kapil.app/kv/sum?key=pageviews,${slug}&value=1`,
              {
                method: 'POST',
                body: JSON.stringify(10),
              },
            );
            const newVal = cachedVal + 1;
            setViews(newVal);
            sessionStorage.setItem(storageKey, newVal.toString());
          }
          return; // Done, no need to fetch
        }
      }

      // If we are here, we need to fetch
      setShouldFetch(true);
    }

    init();
  }, [slug, trackView]);

  useEffect(() => {
    // Ensure we have data and were supposed to fetch
    if (data && shouldFetch) {
      // FIX: Handle case where key doesn't exist (value is null) -> default to 0
      // Also handles your existing structure expectation (data.value.value)
      let fetchedVal = 0;

      if (data.value !== null) {
        // If data.value is an object with a .value property, use that (legacy/wrapper support)
        // Otherwise use data.value directly
        const rawValue =
          typeof data.value === 'object' &&
          data.value !== null &&
          'value' in data.value
            ? data.value.value
            : data.value;

        fetchedVal = parseInt(rawValue, 10);
      }

      if (!isNaN(fetchedVal)) {
        const run = async () => {
          let displayVal = fetchedVal;

          if (trackView) {
            await fetch(
              `https://kv.kapil.app/kv/sum?key=pageviews,${slug}&value=1`,
              {
                method: 'POST',
                body: JSON.stringify(10),
              },
            );
            displayVal = fetchedVal + 1;
          }

          setViews(displayVal);
          sessionStorage.setItem(`view-count-${slug}`, displayVal.toString());
        };
        run();
      }
    }
  }, [data, shouldFetch, trackView, slug]);

  return (
    <span className="text-sm text-neutral-600 dark:text-neutral-400 animate-flip-up">
      {views ? `${views.toLocaleString()} views` : ''}
    </span>
  );
}
