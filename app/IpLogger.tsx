"use client";

import { useState, useEffect } from "react";
import { saveVisitorLog } from "app/db/actions";
import { usePathname } from "next/navigation";

export default function IpLogger() {
  const [ip, setIp] = useState("0.0.0.0");
  const [location, setLocation] = useState("Earth");
  const [isipLoading, setipLoading] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const pathname = usePathname() || "undefined";
  useEffect(() => {
    fetch("https://api.kapil.app/api/ip")
      .then((res) => res.json())
      .then((ip) => {
        setIp(ip.ip);
      }),
      setipLoading(false);
  }, []);
  useEffect(() => {
    fetch(`https://ipapi.co/${ip}/json`)
      .then((res) => res.json())
      .then((data) => {
        setLocation(`${data.city}, ${data.country_name}`);
        setLoading(false);
      });
  }, [isipLoading]);
  useEffect(() => {
    saveVisitorLog({ path: pathname, ip: ip, location: location });
  }, [isLoading]);
  return <span></span>;
}
