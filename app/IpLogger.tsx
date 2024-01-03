"use client";

import { useState, useEffect } from "react";
import { saveVisitorLog } from "app/db/actions";
import { usePathname } from "next/navigation";

export function IpLogger() {
  const [ip, setIp] = useState("0.0.0.0");
  const [location, setLocation] = useState("Earth");
  const pathname = usePathname() || "undefined";
  useEffect(() => {
    fetch("https://api.kapil.app/api/ip")
      .then((res) => res.json())
      .then((ip) => {
        setIp(ip.ip);
      });
  }, []);
  useEffect(() => {
    if (ip !== "0.0.0.0") {
      fetch(`https://ipapi.co/${ip}/json`)
        .then((res) => res.json())
        .then((data) => {
          setLocation(`${data.city}, ${data.country_name}`);
        });
    }
  }, [ip]);
  useEffect(() => {
    if (
      ip !== "0.0.0.0" &&
      location !== "undefined, undefined" &&
      location !== "Earth"
    ) {
      saveVisitorLog({ path: pathname, ip: ip, location: location });
    }
  }, [ip, location, pathname]);
  return <span></span>;
}
