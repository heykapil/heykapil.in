'use client';

import { useState, useEffect } from 'react';
import { saveVisitorLog } from 'app/db/actions';
import { usePathname } from 'next/navigation';
import useStorage from 'app/components/helpers/useStorage';
import { getCookie, setCookie } from 'cookies-next';
export function IpLogger() {
  const { userAgent } = useStorage();
  const options = {
    maxAge: 60 * 60 * 24,
    sameSite: process.env.NODE_ENV === 'production',
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
  };
  setCookie('userAgent', decodeURI(userAgent()), options);
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
            setCookie('sessionIP', data.ip, options);
            setCookie(
              'sessionLocation',
              `${data.city}, ${data.country_name}`,
              options,
            );
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
