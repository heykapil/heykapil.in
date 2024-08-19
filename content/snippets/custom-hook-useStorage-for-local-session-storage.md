---
id: d5b1426a-7f68-4576-b161-5e39f3bcc009
title: Custom Hook useStorage for Local and Session Storage
description: Na.
datetimeCreate: 2024-07-30 14:31:13
datetimeUpdate: 2024-07-30 17:24:18
logo: next.svg
created: 2024-07-30T18:14
updated: 2024-07-30T18:14
---

```ts
// hooks/useStorage.ts

type StorageType = 'session' | 'local';
type UseStorageReturnValue = {
  getItem: (key: string, type?: StorageType) => string;
  setItem: (key: string, value: string, type?: StorageType) => boolean;
  removeItem: (key: string, type?: StorageType) => void;
};

const useStorage = (): UseStorageReturnValue => {
  const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' => `${type ?? 'session'}Storage`;

  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

  const getItem = (key: string, type?: StorageType): string => {
    return isBrowser ? window[storageType(type)][key] : '';
  };

  const setItem = (key: string, value: string, type?: StorageType): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value);
      return true;
    }

    return false;
  };

  const removeItem = (key: string, type?: StorageType): void => {
    window[storageType(type)].removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useStorage;
```

## How to use

You can specify the storage type as well in  `setItem` and `getItem` functions, if unspecified it will be session storage.

1. For Session storage

```ts
'use client';
import useStorage from 'hooks/useStorage';
import useEffect from 'react';
...
...
const { getItem, setItem } = useStorage();
useEffect(() => {
setItem('sessionToken', 'value of token', "session")
// setItem('sessionToken', 'value of token')
// this will also work as default storage is session
} , [])
const token = getItem('sessionToken', "session") || ''
// const token = getItem('sessionToken') || ''
console.log(token)
```
2. For Local storage

```ts
const { getItem, setItem } = useStorage();
setItem('token', 'value of token', "local")
getItem('token', 'value of token', "local")
```
