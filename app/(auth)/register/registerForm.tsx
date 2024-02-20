"use client";
import React, { useEffect, useRef, useState } from "react";
import { Register } from "app/db/actions";
import { SubmitButton } from "../guestbook/SubmitButton";
import Link from "next/link";

function isEmailValid(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function testUsername(u: string) {
  return /^[0-9A-Za-z]{6,16}$/.test(u);
}

function testPassword(p: string) {
  return (
    /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/.test(p) &&
    /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(p)
  );
}

const RegisterForm = ({ callBackUrl }: { callBackUrl: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [usernameAvaliable, setusernameAvailiable] = useState(false);
  const [emailAvaliable, setemailAvailiable] = useState(false);
  const [formData, setformData] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
  });
  //   console.log(testUsername(formData.username));
  useEffect(() => {
    if (formData.username.length >= 3) {
      fetch(
        `https://api.kapil.app/api/user/taken?username=${formData.username}`,
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((data: any) => {
          setusernameAvailiable(data.ok || false);
        });
    }
  }, [formData.username]);
  useEffect(() => {
    if (formData.email.length >= 3 && isEmailValid(formData.email)) {
      fetch(`https://api.kapil.app/api/user/taken?username=${formData.email}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data: any) => {
          setemailAvailiable(data.ok || false);
        });
    }
  }, [formData.email]);
  return (
    <form
      action={Register}
      ref={formRef}
      className="flex flex-col space-y-1 mb-10 my-2 gap-2 max-w-lg"
    >
      <div className="relative">
        <input
          type="text"
          className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          name="full_name"
          minLength={3}
          placeholder="John Doe"
          value={formData.full_name}
          onChange={(e) =>
            setformData({ ...formData, full_name: e.target.value })
          }
          required
          autoFocus
        />
        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <label htmlFor="full_name" className="text-neutral-500">
            {formData.full_name.length > 3 ? <span>✅</span> : "Full name"}
          </label>
        </span>
      </div>
      <div className="relative">
        <input
          type="email"
          className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          name="email"
          minLength={3}
          value={formData.email}
          onChange={(e) => {
            setformData({ ...formData, email: e.target.value });
          }}
          placeholder="my-name@email.com"
          required
        />
        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <label htmlFor="email" className="text-neutral-500">
            {emailAvaliable && isEmailValid(formData.email) ? (
              <span>✅</span>
            ) : (
              "Email address"
            )}
          </label>
        </span>
      </div>
      <div className="relative">
        <input
          type="text"
          className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          name="username"
          value={formData.username}
          onChange={(e) => {
            setformData({ ...formData, username: e.target.value });
          }}
          minLength={3}
          placeholder="john123"
          required
        />
        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <label htmlFor="username" className="text-neutral-500">
            {usernameAvaliable &&
            formData.username.length >= 3 &&
            testUsername(formData.username) ? (
              <span>✅</span>
            ) : (
              "Username"
            )}
          </label>
        </span>
      </div>
      <div className="relative">
        <input
          type="password"
          className="p-2 caret-current focus:ring-neutral-500 focus:border-neutral-600 dark:focus:border-neutral-400 focus:outline-none block w-full border border-neutral-300 dark:border-neutral-700 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          name="password"
          minLength={3}
          value={formData.password}
          onChange={(e) =>
            setformData({ ...formData, password: e.target.value })
          }
          placeholder="123abc!@#"
          required
        />
        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <label htmlFor="password" className="text-neutral-500">
            {testPassword(formData.password) &&
            formData.password.length >= 3 ? (
              <span>✅</span>
            ) : (
              "Password"
            )}
          </label>
        </span>
      </div>
      <div className="space-y-0">
        <div className="mb-10">
          <a
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:underline hover:underline-offset-2"
            href="https://1password.com/password-generator"
            target="_blank"
          >
            Strong password generator ↗
          </a>
        </div>
        <div className="text-sm flex justify-between items-center">
          <Link
            className="px-4 py-2 border border-opacity-50 border-neutral-900 dark:border-pink-50 text-sm rounded-md font-semibold hover:border-black/[0.9] dark:hover:border-white/[0.9] hover:shadow-lg"
            href={`/signin?callback=${callBackUrl}`}
          >
            Sign in
          </Link>
          <SubmitButton
            type="submit"
            className="px-8 py-2  bg-neutral-900 dark:bg-pink-50 text-white dark:text-black text-sm rounded-md font-semibold hover:bg-black/[0.9] dark:hover:bg-white/[0.9] hover:shadow-lg"
            pendingState={<span>Registering...</span>}
          >
            Register
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;