---
title: Client side email validation using email regex
id: 018d8d65-db12-75a3-a98b-0a5a75ff00a3
logo: javascript.png
created: 2024-02-09T18:14
updated: 2024-02-09T18:14
---

```jsx
"use client";
import { useState } from "react";
// Client-side email validation
function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function Page() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  function handleEmailChange(event) {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(isEmailValid(newEmail));
  }

  return (
    <form>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        className={isValidEmail ? "text-green-500" : "text-red-500"}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

```tsx
// username containing alphabets and numbers 6 to 16 length
function testUsername(u: string) {
  return /^[0-9A-Za-z]{6,16}$/.test(u);
}

function testPassword(testcase: string) {
  return (
    // numbers, alphabets uppercase, lowercase and length 8 to 32
    /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/.test(testcase) &&
    // (including characters)
    /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(
      testcase
    )
  );
}
```
