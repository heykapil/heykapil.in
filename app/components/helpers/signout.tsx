"use client";

import { Logout } from "app/db/actions";
export function SignOut({ callback }: { callback: string | null }) {
  return (
    <button
      className="text-xs text-neutral-700 dark:text-neutral-300 mt-2 mb-6 rounded-lg p-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-300"
      onClick={async () => Logout(callback || "/signin")}
    >
      Sign out
    </button>
  );
}
