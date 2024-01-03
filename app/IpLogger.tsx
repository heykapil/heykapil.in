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
    if (ip !== "0.0.0.0") {
      fetch(`https://ipapi.co/${ip}/json`)
        .then((res) => res.json())
        .then((data) => {
          setLocation(`${data.city}, ${data.country_name}`);
          setLoading(false);
        });
    }
  }, [ip]);
  useEffect(() => {
    if (ip !== "0.0.0.0" && (location !== "undefined, undefined" || "Earth")) {
      saveVisitorLog({ path: pathname, ip: ip, location: location });
    }
  }, [ip, location]);
  return <span></span>;
}
