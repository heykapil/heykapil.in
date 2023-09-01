"use client";

import { useRef } from "react";
import { saveGuestbookEntry } from "lib/actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  return (
    <form
      style={{ opacity: !pending ? 1 : 0.5 }}
      className='relative max-w-[500px] '
      ref={formRef}
      action={async (formData) => {
        await saveGuestbookEntry(formData);
        formRef.current?.reset();
      }}
    >
      <input
        aria-label=' Your message'
        placeholder=' Your message...'
        disabled={pending}
        name='entry'
        required
        className='py-2 mt-1 block w-full max-w-full outline-none focus:outline focus:outline-offset-2	hover:outline-gray-500 hover:outline hover:outline-offset-2	focus:outline-gray-500 rounded-md bg-black/5 dark:bg-white/5 text-gray-900 dark:text-gray-100'
      />
      <button
        className='items-center text-sm hover:outline hover:outline-offset-2 hover:outline-gray-500 rounded-lg outline-none mt-2  justify-center z-10 bg-black/5 dark:bg-white/5 right-0 top-0 px-6 py-2  text-gray-800  dark:text-gray-200'
        disabled={pending}
        type='submit'
      >
        Sign
      </button>
    </form>
  );
}
