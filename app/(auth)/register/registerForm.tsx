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
    /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/.test(
      p
    )
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
      className="flex flex-col space-y-3 mb-10 my-3 gap-4"
    >
      <div className="relative">
        <input
          type="text"
          className="w-full dark:bg-neutral-800 rounded p-3 border border-gray-300 dark:bo focus:border-neutral-700 dark:focus:border-neutral-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-neutral-300 focus:outline-none input active:outline-none"
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
          <label htmlFor="full_name">
            {formData.full_name.length > 3 ? <span>✅</span> : null}
          </label>
        </span>
      </div>
      <div className="relative">
        <input
          type="email"
          className="w-full dark:bg-neutral-800 rounded p-3 border border-gray-300 focus:border-neutral-700 dark:focus:border-neutral-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-neutral-300 focus:outline-none input active:outline-none"
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
          <label htmlFor="email" className="focus:hidden">
            {emailAvaliable && isEmailValid(formData.email) ? (
              <span>✅</span>
            ) : null}
          </label>
        </span>
      </div>
      <div className="relative">
        <input
          type="text"
          className="w-full dark:bg-neutral-800 rounded p-3 border border-gray-300 focus:border-neutral-700 dark:focus:border-neutral-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-neutral-300 focus:outline-none input active:outline-none"
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
          <label htmlFor="username" className="opacity-100">
            {usernameAvaliable &&
            formData.username.length >= 3 &&
            testUsername(formData.username) ? (
              <span>✅</span>
            ) : null}
          </label>
        </span>
      </div>
      <div className="relative">
        <input
          type="password"
          className="w-full dark:bg-neutral-800 rounded p-3 border border-gray-300 focus:border-neutral-700 dark:focus:border-neutral-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-neutral-300 focus:outline-none input active:outline-none"
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
          <label htmlFor="password">
            {testPassword(formData.password) &&
            formData.password.length >= 3 ? (
              <span>✅</span>
            ) : null}
          </label>
        </span>
      </div>
      <div className="space-y-9">
        <div>
          <a
            className="text-sm font-bold text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 py-2 hover:underline"
            href="https://1password.com/password-generator"
            target="_blank"
          >
            Strong password generator!
          </a>
        </div>
        <div className="text-sm flex justify-between items-center">
          <Link
            className="font-bold text-neutral-700 dark:text-neutral-300 py-2 px-6 rounded -ml-2 bg-neutral-200 dark:bg-neutral-800 "
            href={`/signin?callback=${callBackUrl}`}
          >
            Sign in
          </Link>
          <SubmitButton
            type="submit"
            className="py-2 font-semibold px-6 rounded text-black dark:text-white bg-green-300 hover:bg-green-400 dark:bg-green-700  dark:hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-red-500"
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
