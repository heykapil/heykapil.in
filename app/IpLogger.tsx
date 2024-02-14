"use client";

import { useState, useEffect } from "react";
import { saveVisitorLog } from "app/db/actions";
import { usePathname } from "next/navigation";

export function IpLogger() {
  const whiteListIp = ["0.0.0.0", "14.139.122.17", "157.32.79.104"];
  const [ip, setIp] = useState("0.0.0.0");
  const [location, setLocation] = useState("Earth");
  const path = usePathname() || "undefined";
  useEffect(() => {
    fetch("https://api.kapil.app/api/ip")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        setIp("0.0.0.0");
      })
      .then((data: any) => {
        if (data !== undefined) {
          setIp(data.ip);
          setLocation(`${data.city}, ${data.country_name}`);
        }
      });
  }, []);
  useEffect(() => {
    if (
      !whiteListIp.includes(ip) &&
      location !== "undefined, undefined" &&
      location !== "Earth" &&
      location !== "Ahmedabad, India" &&
      path !== "undefined"
    ) {
      saveVisitorLog({ path, ip, location });
      // console.log(path, ip, location);
    }
  }, [ip, location, path]);
  return <span></span>;
}
