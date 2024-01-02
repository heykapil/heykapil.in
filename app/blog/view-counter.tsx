"use client";

import { useState, useEffect } from "react";
import { increment, saveVisitorLog } from "app/db/actions";

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
  const [ip, setIp] = useState("0.0.0.0");
  const [location, setLocation] = useState("Earth");
  const [isLoading, setLoading] = useState(true);
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug);
  const number = new Number(viewsForSlug?.count || 0);
  useEffect(() => {
    fetch("https://api.kapil.app/api/ip")
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
      });
    fetch(`https://ip-api.com/json/${ip}`)
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.city);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (trackView) {
      increment(slug);
    }
    if (isLoading === false) {
      saveVisitorLog({ path: slug, ip: ip, location: location });
    }
  }, []);

  return (
    <p className="text-gray-600 dark:text-gray-400">
      {`${number.toLocaleString()}`} views
    </p>
  );
}
