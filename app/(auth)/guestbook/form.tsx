"use client";

import { useRef } from "react";
import { saveGuestbookEntry } from "app/db/actions";
import { SubmitButton } from "./SubmitButton";
export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      className="relative max-w-[500px]"
      ref={formRef}
      action={async (formData) => {
        await saveGuestbookEntry(formData);
        formRef.current?.reset();
      }}
    >
      <input
        aria-label="Your message"
        placeholder="Your message..."
        name="entry"
        type="text"
        required
        className="pl-4 pr-32 caret-current py-2 mt-1 focus:ring-neutral-500 focus:border-neutral-500 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
      />
      <SubmitButton
        pendingState={<span className="flex">Signing...</span>}
        type="submit"
        className="flex text-sm items-center justify-center absolute right-1 top-1 px-2 py-1 font-medium h-8 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md w-fit"
      >
        Sign
      </SubmitButton>
    </form>
  );
}
