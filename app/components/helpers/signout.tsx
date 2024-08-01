"use client";

import { Logout } from "app/db/actions";
export function SignOut({ callback }: { callback: string }) {
  return (
    <button
      className="text-xs text-neutral-700 dark:text-neutral-300 mt-2 mb-6 rounded-lg px-3 py-2 font-semibold bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
      onClick={() => Logout({ callback })}
    >
      Sign out
    </button>
  );
}
