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
      .then((ip) => {
        setIp(ip.ip);
      }),
      [];
  });

  useEffect(() => {
    fetch(`https://ipapi.co/${ip}/json`)
      .then((res) => res.json())
      .then((data) => {
        setLocation(`${data.city}, ${data.country_name}`);
        setLoading(false);
      }),
      [ip];
  });

  useEffect(() => {
    if (trackView) {
      increment(slug);
    }
    {
      isLoading !== true
        ? saveVisitorLog({ path: slug, ip: ip, location: location })
        : null;
    }
  }, [location]);

  return (
    <p className="text-gray-600 dark:text-gray-400">
      {`${number.toLocaleString()}`} views
    </p>
  );
}
