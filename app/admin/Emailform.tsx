"use client";
import { sendEmail } from "app/db/actions";
import { SubmitButton } from "app/guestbook/SubmitButton";
import { useRef, useState, useEffect } from "react";
import { marked } from "marked";
import MarkdownPreview from "app/admin/Preview";
marked.use({
  async: false,
  breaks: false,
  gfm: true,
  hooks: null,
  pedantic: false,
  silent: false,
  tokenizer: null,
  walkTokens: null,
});
export default function Emailform() {
  const formRef = useRef<HTMLFormElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [attachment, setAttachment] = useState(false);
  const [formData, setformData] = useState({
    from: "Kapil Chaudhary <hi@kapil.app>",
    to: "",
    subject: "",
    md: "",
    html: "",
    fileurl: null || "",
    filename: null || "",
  });
  useEffect(
    () =>
      setformData({
        ...formData,
        html: encodeURI(marked.parse(formData.md) as string),
      }),
    [formData.md]
  );
  return (
    <>
      <form
        id="comment-form"
        style={{ opacity: 1 }}
        className="w-full max-w-full mb-8 space-y-1"
        ref={formRef}
        action={async (formData: FormData) => {
          await sendEmail(formData);
        }}
      >
        <div className="grid grid-col-2 gap-2">
          <div className="items-center">
            <input
              type="text"
              name="from"
              placeholder="from"
              className="border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-1"
              value={formData.from}
              onChange={(e) =>
                setformData({ ...formData, from: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              name="to"
              placeholder="to"
              className="border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-2"
              value={formData.to}
              onChange={(e) => setformData({ ...formData, to: e.target.value })}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="subject"
              placeholder="subject"
              className="flex border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-2"
              value={formData.subject}
              onChange={(e) =>
                setformData({ ...formData, subject: e.target.value })
              }
              required
            />
          </div>
          <textarea
            rows={8}
            name="md"
            placeholder="Enter the markdown text"
            className="flex border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full mb-6 px-1 py-2"
            value={formData.md}
            onChange={(e) => setformData({ ...formData, md: e.target.value })}
            required
          />
          <div className="inline-flex items-center gap-2 mb-2">
            <label className="relative flex cursor-pointer items-center rounded-full">
              <input
                id="default-checkbox"
                type="checkbox"
                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-none checked:rounded-full border border-[var(--foreground)] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-pink-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                checked={attachment}
                onChange={(e) => setAttachment(e.target.checked)}
              />
              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
            <span className="cursor-pointer opacity-80">Have attachment?</span>
          </div>
          {attachment && (
            <>
              <input
                type="text"
                name="fileurl"
                placeholder="File URL"
                className="flex border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-2"
                value={formData.fileurl}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    fileurl: e.target.value as string,
                  })
                }
                required
              />
              <input
                type="text"
                name="filename"
                placeholder="File name"
                className="flex border-b bg-inherit ring-offset-0 outline-none border-gray-200 dark:border-gray-800 w-full lg:w-3/4 xl:w-1/2 px-1 py-2"
                value={formData.filename}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    filename: e.target.value as string,
                  })
                }
                required
              />
            </>
          )}
          <div className="inline-flex items-center gap-2 mb-2">
            <label className="relative flex cursor-pointer items-center rounded-full">
              <input
                id="default-checkbox"
                type="checkbox"
                className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded-none checked:rounded-full border border-[var(--foreground)] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-pink-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                checked={showPreview}
                onChange={(e) => setShowPreview(e.target.checked)}
              />
              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
            <span className="cursor-pointer opacity-80">Preview</span>
          </div>
        </div>
        {showPreview && (
          <div className="rounded-md mb-2">
            <MarkdownPreview markdown={formData.md} />
          </div>
        )}
        <input
          type="text"
          name="html"
          placeholder="html"
          className="hidden"
          value={formData.html}
          onChange={(e) => e.target.value}
          hidden
        />
        <SubmitButton
          className="px-3 py-2 border-b dark:border-gray-800-neutral-200 dark:border-b ring-offset-0 outline-none border-gray-200 dark:border-gray-800-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-8 transition-all',
         disabled:opacity-50"
          pendingState={
            <p className="flex items-center gap-1">
              Submitting... <span className="loading loading-dots"></span>
            </p>
          }
          //   disabled={!tranXproof}
          type="submit"
        >
          <p className="">Submit</p>
        </SubmitButton>
      </form>
    </>
  );
}
