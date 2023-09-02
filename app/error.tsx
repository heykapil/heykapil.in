"use client";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error;
  // reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div>
      <p className='text-red-500'>
        Oh no, something went wrong... maybe refresh?
      </p>
    </div>
  );
}
