'use client';

import { increment } from 'app/db/actions';
import { useEffect } from 'react';
export default function ViewCounter({
  slug,
  trackView,
}: {
  slug: string;
  trackView?: boolean;
}) {
  useEffect(() => {
    if (trackView) {
      increment(slug);
    }
  }, []);
  return null;
}
