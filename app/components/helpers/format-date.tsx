'use client';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  date: string | Date | number | null | undefined; // accept multiple input shapes
  short?: boolean;
  refreshIntervalMs?: number;
};

function normalizeToIsoString(d: Props['date']) {
  if (!d && d !== 0) return ''; // empty
  if (typeof d === 'string') {
    return d.includes('T') ? d : `${d}T00:00:00`;
  }
  if (d instanceof Date) {
    return d.toISOString();
  }
  // number (timestamp) or other -> coerce to Number then to ISO
  const n = Number(d);
  if (!Number.isNaN(n)) {
    return new Date(n).toISOString();
  }
  // fallback to string
  const s = String(d);
  return s.includes('T') ? s : `${s}T00:00:00`;
}

function computeRelativeParts(targetDate: Date, now: Date) {
  const msDiff = now.getTime() - targetDate.getTime();
  const daysDiff = Math.floor(msDiff / (1000 * 3600 * 24));

  let years = 0,
    months = 0,
    weeks = 0,
    days = 0;
  let remaining = daysDiff;

  while (remaining > 0) {
    if (remaining >= 365) {
      years++;
      remaining -= 365;
    } else if (remaining >= 30) {
      months++;
      remaining -= 30;
    } else if (remaining >= 7) {
      weeks++;
      remaining -= 7;
    } else {
      days++;
      remaining -= 1;
    }
  }

  let formatted = '';
  if (years > 0) formatted = `${years}y ago`;
  else if (months > 0) formatted = `${months}mo ago`;
  else if (weeks > 0) formatted = `${weeks}w ago`;
  else if (days > 0) formatted = `${days}d ago`;
  else formatted = 'Today';

  return { formatted, daysDiff };
}

export function FormatDate({
  date,
  short = false,
  refreshIntervalMs = 60_000,
}: Props) {
  // Normalize date to an ISO string first (handles Date objects, timestamps, etc.)
  const iso = useMemo(() => normalizeToIsoString(date), [date]);

  // If iso is empty or invalid, render nothing or a fallback
  const targetDate = useMemo(() => (iso ? new Date(iso) : null), [iso]);

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), refreshIntervalMs);
    return () => clearInterval(id);
  }, [refreshIntervalMs]);

  if (!targetDate || Number.isNaN(targetDate.getTime())) {
    return <span>-</span>;
  }

  const { formatted } = useMemo(
    () => computeRelativeParts(targetDate, now),
    [targetDate, now],
  );

  const fullDate = targetDate.toLocaleString('en-in', {
    month: short ? 'short' : 'long',
    day: 'numeric',
    ...(short ? {} : { year: 'numeric' }),
  });

  return (
    <span>
      {fullDate} {!short && `(${formatted})`}
    </span>
  );
}
