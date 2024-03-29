"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function FormSubmitButton({ children, pendingState, ...props }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} {...props}>
      {pending ? pendingState : children}
    </button>
  );
}
