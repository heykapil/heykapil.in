'use client';
import { OauthCallback } from 'app/db/actions';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
export default function OauthCallBackClient() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token') || '';
  const next = searchParams?.get('next') || '';
  const sessionId = searchParams?.get('sessionid') || '';
  useEffect(() => {
    (async () => {
      await OauthCallback({ token, next, sessionId });
    })();
  }, []);
  return null;
}
