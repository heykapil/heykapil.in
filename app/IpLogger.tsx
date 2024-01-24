"use client";

import { useState, useEffect } from "react";
import { saveVisitorLog } from "app/db/actions";
import { usePathname } from "next/navigation";

export function IpLogger() {
  const [ip, setIp] = useState("0.0.0.0");
  const [location, setLocation] = useState("Earth");
  const path = usePathname() || "undefined";
  useEffect(() => {
    fetch("https://ip.kapil.app", { redirect: "follow" })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        setIp("0.0.0.0");
      })
      .then((ip: any) => {
        if (ip !== undefined) {
          setIp(ip.ip);
        }
      });
  }, []);
  useEffect(() => {
    if (ip !== "0.0.0.0") {
      fetch(`https://ipapi.co/${ip}/json`)
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
          setLocation("Earth");
        })
        .then((data) => {
          if (data !== undefined) {
            setLocation(`${data.city}, ${data.country_name}`);
          }
        });
    }
  }, [ip]);
  useEffect(() => {
    if (
      ip !== "0.0.0.0" &&
      //  my personal IP
      ip !== "14.139.122.17" &&
      // undefined location
      location !== "undefined, undefined" &&
      location !== "Earth" &&
      // undefined path
      path !== "undefined"
    ) {
      saveVisitorLog({ path, ip, location });
    }
  }, [ip, location, path]);
  return <span></span>;
}
