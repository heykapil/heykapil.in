import { useSyncExternalStore, useDebugValue } from "react";

function subscribe(callback) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );
  useDebugValue(isOnline ? "Online" : "Offline");
  return isOnline;
}
