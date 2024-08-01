'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from "react";
import { Suspense } from 'react'
import { Logout } from "app/db/actions";
import Loading from './loading';
export default function LogoutPage() {
  const searchParams = useSearchParams()
  const callback = searchParams?.get('callback') || '/signin';
  useEffect(() => { Logout({ callback: callback })}, []);
  return <Suspense fallback={<Loading />}>
  <span>Logging out...</span>
  </Suspense>;
}
