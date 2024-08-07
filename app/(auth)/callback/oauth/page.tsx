import OauthCallBackClient from './Client';
import { Suspense } from 'react';
export default function OauthCallBackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OauthCallBackClient />
    </Suspense>
  );
}
