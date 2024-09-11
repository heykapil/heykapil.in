---
id: 5c13160f66234c91bea9f71c5aca1a90
title: Server action to submit form data to a google sheet.
description: Na.
datetimeCreate: 2024-01-16 14:31:13
datetimeUpdate: 2024-01-16 17:24:18
logo: next.svg
created: 2024-01-16T18:14
updated: 2024-01-16T18:14
---

We will create a nextjs form that uses the server action to submit the form data to a google sheet.

- First we need to go to the [google developer console](https://console.developers.google.com).
- Login and create a new project.
- After that click on Credentials from the left side menu and click on manage service accounts.
- Create a service account, fill name, description etc, rest options are optional.
- Once service account is created, click on the three dots under action column of the service account to manage keys.
- Click on create a new key, select json file to download.
- This json file will contain the environment variables (`private_key`, `client_email`) to connect to the service account.
- Go to home page of the project on the cloud console, click on APIs and service on left side menu, click on library.
- Search Sheet from the search bar and you’ll get Google Sheet on the first result. Enable it.
- Go to [google spreadsheet](https://docs.google.com/spreadsheets/create), create a new spreadheet that will receive the form data.
- Give your sheet a name and save the `SHEET_ID` from the google sheet URL as enviroment variables.
- (Important) Share this spreadsheet with the service account email address (check downloaded json) as role of **editor** (if not then with everyone with the link)
- Add your fields name (make sure these are same as formData id/names from the frontend) as heading in first row of the spreadsheet.
- Spreadsheet is ready to receive the form data updates.
- Lets get back to out nextjs project where we will create a form.
- Lets add environment variables that we need

  ```txt
  // .env
  GOOGLE_PRIVATE_KEY = ""; // from JSON
  GOOGLE_CLIENT_EMAIL = ""; // from JSON
  GOOGLE_SHEET_ID = ""; // from Spreadsheet URL
  ```

- Install `googleapis` packages

  ```bash
  bun add googleapis
  ```

- We will create a simple form that have inputs for the: Registration Date(regDate), name(title+firstname+lastname), email, phone, message. You can add as many as you want, make sure to change the spreadsheet header, api (values, range) and server action accordingly.

- Create an API route to interact with google speadsheet.

  ```ts
  // pages/api/google-sheet-submit.ts

  import type { NextApiRequest, NextApiResponse } from "next";
  import { google } from "googleapis";

  type SheetForm = {
    RegDate: string;
    name: string;
    email: string;
    phone: string;
    message: string;
  };

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Only POST requests allowed" });
    }

    const body = req.body as SheetForm;

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key:
            process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join("\n") ||
            "",
        },
        },
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      });

      const sheets = google.sheets({
        auth,
        version: "v4",
      });

      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "A1:E1", // IMP!! Check with the spreadsheet first row (change accordingly to number of columns in the spreadsheet)
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [body.RegDate, body.name, body.email, body.phone, body.message],
          ],
        },
      });

      return res.status(201).json({
        data: response.data,
      });
    } catch (e: any) {
      return res.status(e.code).send({ message: e.message });
    }
  }
  ```

- Create a sever action file having async function `sendtoGoogle` that uses formData and sends it to the api endpoint to post data to the spreadsheet.

  ```ts
  // lib/action.ts
  "use server";
  import { headers } from "next/headers";
  export async function sendtoGoogle(formData: FormData) {
    const host = headers().get("host");
    const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
    const RegDate = formData.get("RegDate")?.toString() || "";
    const title = formData.get("title")?.toString() || "";
    const firstname = formData.get("firstname")?.toString() || "";
    const lastname = formData.get("lastname")?.toString() || "";
    const name = title + " " + firstname + " " + lastname;
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const message =
      formData.get("message")?.toString().replace(/\n|\r/g, " ") || ""; // replaces new line with a space
    let res = await fetch(`${protocal}://${host}/api/google-sheet-submit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RegDate,
        name,
        email,
        phone,
        message,
      }),
    });
    const content = await res.json();
    console.log(content);
  }
  ```

- Last step is to create a form in nextjs that executes our server action function `sendtoGoogle`.

- we will be using these libraries `zod`, `clsx`, `react-hook-form`, `react-hook-form-persist`, `@hookform/resolver`, `date-fns`. Add these to the project.

  ```bash
  bun add zod react-hook-form react-hook-form-persist @hookform/resolver date-fns clsx
  ```

- Write the zod form schema to check and verify the input details.

  ```ts
  // lib/Schema.ts
  import * as z from "zod";
  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
  export const FormSchema = z.object({
    title: z.string(),
    firstname: z.string().min(2, "Invalid First Name!").max(36),
    lastname: z.string().min(2, "Invalid Last Name!").max(36),
    email: z.string().min(1, "Invalid email address!").email({
      message: "Invalid email address!",
    }),
    phone: z
      .string()
      .min(10, "Enter a valid phone number!")
      .max(16)
      .regex(phoneRegex, "Invalid Number!"),
    message: z.string().min(5, "Enter valid message!"),
  });
  ```

- Create a form submit button component that will show the pending status of our form.

  ```tsx
  // components/FormSubmitComponent.jsx
  "use client";
  import { useFormStatus } from "react-dom";
  export function FormSubmitButton({ children, pendingState, ...props }) {
    const { pending } = useFormStatus();
    return (
      <button disabled={pending} {...props}>
        {pending ? pendingState : children}
      </button>
    );
  }
  ```

- Write a client side form component that uses the above form scheme and form details and executes the server action.

  ```ts
  // components/ClientForm
  "use client";
  import { zodResolver } from "@hookform/resolvers/zod";
  import * as z from "zod";
  import { useForm } from "react-hook-form";
  import useFormPersist from "react-hook-form-persist";
  import { useRef } from "react";
  import { sendtoGoogle } from "@/lib/action";
  import { useState } from "react";
  import { FormSubmitButton } from "./FormSubmitButton";
  import { useRouter } from "next/navigation";
  import { FormSchema } from "@/lib/Schema";
  import { format } from "date-fns/format";
  import { clsx } from "clsx";
  type FormInput = z.infer<typeof FormSchema>;

  function getDisplayTime() {
    return format(new Date(), "MMM dd yyyy, hh:mm:ss b");
  }

  export default function ClientForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [currentDate, setCurrentDate] = useState("");
    const router = useRouter();
    const {
      handleSubmit,
      register,
      watch,
      setValue,
      formState: { errors, isDirty, isValid },
    } = useForm<FormInput>({
      mode: "onChange",
      reValidateMode: "onChange",
      resolver: zodResolver(FormSchema),
      // defaultValues: {
      //   name: ".",
      //   email: "",
      // },
    });
    useFormPersist("comment-form", {
      watch,
      setValue,
      // exclude: [""],
    });
    return (
      <>
        <form
          id="comment-form"
          style={{ opacity: 1 }}
          className="w-full h-full container min-h-full max-w-3xl mx-auto mt-10 mb-8 space-y-1"
          ref={formRef}
          action={async (formData: FormData) => {
            await sendtoGoogle(formData);
            router.replace("/thank-you");
          }}
        >
          <div className="mb-4">
            <div className="space-y-6" style={{ zIndex: 1 }}>
              <div className="bg-accent p-2 rounded-lg">
                {/* @ts-ignore */}
                <div className="text-xl font-medium mb-2">
                  1. Personal Details
                </div>
                <div className="space-y-2 mb-2">
                  <div className="flex flex-row space-x-2 ">
                    <div className="text-sm w-1/4">
                      <select
                        {...register("title")}
                        className={clsx(
                          "bg-background",
                          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                          errors?.title?.message
                            ? "text-red-500 border p-[0.65rem] rounded-lg"
                            : "text-green-500 border p-[0.65rem] rounded-lg"
                        )}
                        required
                      >
                        <option value="" id="title">
                          Title
                        </option>
                        <option value="Mr." id="title-0">
                          Mr.
                        </option>
                        <option value="Mrs." id="title-1">
                          Mrs.
                        </option>
                        <option value="Miss" id="title-2">
                          Miss
                        </option>
                        <option value="Ms." id="title-3">
                          Ms.
                        </option>
                        <option value="Mx." id="title-4">
                          Mx.
                        </option>
                        <option value="Dr." id="title-5">
                          Dr.
                        </option>
                        <option value="Hon." id="title-6">
                          Hon.
                        </option>
                        <option id="title-7" value=" ">
                          None
                        </option>
                      </select>
                    </div>
                    <input
                      className="hidden w-0 h-0"
                      type="text"
                      id="RegDate"
                      name="RegDate"
                      value={currentDate}
                      onChange={(e) => e.target.value}
                      hidden
                    />
                    <input
                      placeholder="First name"
                      aria-label="First name"
                      // disabled={pending}
                      {...register("firstname")}
                      minLength={2}
                      className={clsx(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        errors?.firstname?.message
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                      aria-invalid={Boolean(errors.firstname)}
                      required
                    />

                    <input
                      placeholder="Last name"
                      // disabled={pending}
                      {...register("lastname")}
                      className={clsx(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        errors?.lastname?.message
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                      minLength={2}
                      aria-invalid={Boolean(errors.lastname)}
                      required
                    />
                  </div>
                  <div className="flex flex-row items-center space-x-2">
                    <input
                      placeholder="Enter your email"
                      aria-label="Enter your email"
                      // disabled={pending}
                      type="email"
                      className={clsx(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        errors?.email?.message
                          ? "text-red-500 w-full md:max-w-[60%] lg-max-w-[55%]"
                          : "text-green-500 w-full md:max-w-[60%] lg:max-w-[55%]"
                      )}
                      aria-invalid={Boolean(errors.email)}
                      required
                      {...register("email")}
                    />
                    {/* @ts-ignore */}
                    <input
                      placeholder="Phone number"
                      minLength={10}
                      {...register("phone")}
                      className={clsx(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        errors?.phone?.message
                          ? "text-red-500 w-full md:max-w-[37%] lg:max-w-[43.75%]"
                          : "text-green-500 w-full md: max-w-[37%] lg:max-w-[43.75%]"
                      )}
                      aria-invalid={Boolean(errors.phone)}
                    />
                  </div>
                  <textarea
                    {...register("message")}
                    placeholder="Full message"
                    className={clsx(
                      "flex h-100 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      errors?.message?.message
                        ? "text-red-500"
                        : "text-green-500"
                    )}
                    minLength={4}
                    required
                    aria-invalid={Boolean(errors.message)}
                  />
                </div>
                {errors?.firstname?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
                {errors?.lastname?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
                {errors?.email?.message && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
                {errors?.phone?.message && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
                {errors?.message?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  id="terms"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-mediumleading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {" "}
                  I have filled the data according to best of my knowledge and I
                  agree to all the terms and conditions.
                </label>
              </div>
            </div>
          </div>
          <FormSubmitButton
            className="flex h-fit w-fit rounded-md bg-purple-600 text-white disabled:opacity-50 disabled:bg-red-500 px-2 py-1 disabled:btn-error disabled:cursor-not-allowed cursor-pointer"
            pendingState={
              <p className="flex items-center gap-1">
                Submitting <span className="loading loading-dots"></span>
              </p>
            }
            disabled={isDirty && !isValid}
            type="submit"
            onClick={() => setCurrentDate(getDisplayTime())}
          >
            <p className="">Submit</p>
          </FormSubmitButton>
        </form>
      </>
    );
  }
  ```

- Include this component in the page. Fill up the form, test, configure and enjoy! ❤️

- A souce code of this repository is available [here](https://github.com/heykapil/server-action-google-form).
