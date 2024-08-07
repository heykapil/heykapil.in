'use client';

import { useState, useEffect } from 'react';
import { saveVisitorLog } from 'app/db/actions';
import { usePathname } from 'next/navigation';
import useStorage from 'app/components/helpers/useStorage';
import { getCookie, setCookie } from 'cookies-next';
export function IpLogger() {
  const { userAgent } = useStorage();
  setCookie('userAgent', decodeURI(userAgent()));
  const sessionIP = getCookie('sessionIP')?.valueOf() || '';
  const sessionLocation = getCookie('sessionLocation')?.valueOf() || '';
  const [ip, setIp] = useState('0.0.0.0');
  const [location, setLocation] = useState('Earth');
  const path = usePathname() || 'undefined';
  useEffect(() => {
    if (!sessionIP || !sessionLocation) {
      fetch(`https://api2.kapil.app/api/ip`)
        .then((res) => res.json())
        .catch((err) => {
          // console.log(err);
          setIp('0.0.0.0');
        })
        .then((data: any) => {
          if (data !== undefined) {
            setIp(data.ip);
            setLocation(`${data.city}, ${data.country_name}`);
            setCookie('sessionIP', data.ip);
            setCookie('sessionLocation', `${data.city}, ${data.country_name}`);
          }
        });
    } else {
      setIp(sessionIP);
      setLocation(sessionLocation);
    }
  }, []);
  useEffect(() => {
    if (
      ip !== '0.0.0.0' &&
      location !== 'undefined, undefined' &&
      location !== 'Earth' &&
      path !== 'undefined'
    ) {
      saveVisitorLog({ path, ip, location });
    }
  }, [ip, location, path]);
  return null;
}
