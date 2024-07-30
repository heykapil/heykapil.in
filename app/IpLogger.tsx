"use client";

import { useState, useEffect } from "react";
import { saveVisitorLog } from "app/db/actions";
import { usePathname } from "next/navigation";

export function IpLogger() {
  const whiteListIp = ["0.0.0.0"];
  const [ip, setIp] = useState("0.0.0.0");
  const [location, setLocation] = useState("Earth");
  const path = usePathname() || "undefined";
  let endpoint;
  var rand_boolean = Math.random() < 0.5;
  // if (rand_boolean) {
  //   endpoint = `https://api.kapil.app/api/ip`
  // } else {
  //   endpoint = `https://api-kapil.netlify.app/api/ip`
  // }
  useEffect(() => {
    fetch(`https://api2.kapil.app/api/ip`)
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
      // !whiteListIp.includes(ip) &&
      ip !== "0.0.0.0" &&
      location !== "undefined, undefined" &&
      location !== "Earth" &&
      // location !== "Ahmedabad, India" &&
      path !== "undefined"
    ) {
      saveVisitorLog({ path, ip, location });
      // console.log(path, ip, location);
    }
  }, [ip, location, path]);
  return <span></span>;
}
