'use client';

import { useEffect } from 'react';
import { increment } from 'app/db/actions';
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
