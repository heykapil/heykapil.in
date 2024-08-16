import { useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FormState } from './to-form-state';

const useToastMessage = (formState: FormState) => {
  const prevTimestamp = useRef(formState.timestamp);

  const showToast =
    formState.message && formState.timestamp !== prevTimestamp.current;

  useEffect(() => {
    if (showToast) {
      if (formState.status === 'ERROR') {
        toast.error(formState.message);
      } else {
        toast.success(formState.message);
      }

      prevTimestamp.current = formState.timestamp;
    }
  }, [formState, showToast]);

  // stay usable without JS
  return (
    <noscript>
      {formState.status === 'ERROR' && (
        <div style={{ color: 'red' }}>{formState.message}</div>
      )}

      {formState.status === 'SUCCESS' && (
        <div style={{ color: 'green' }}>{formState.message}</div>
      )}
    </noscript>
  );
};

const useFormReset = (formState: FormState) => {
  const formRef = useRef<HTMLFormElement>(null);
  const prevTimestamp = useRef(formState.timestamp);

  useEffect(() => {
    if (!formRef.current) return;
    if (
      formState.status === 'SUCCESS' &&
      formState.timestamp !== prevTimestamp.current
    ) {
      formRef.current.reset();

      prevTimestamp.current = formState.timestamp;
    }
  }, [formState.status, formState.timestamp]);

  return formRef;
};

export { useToastMessage, useFormReset };
