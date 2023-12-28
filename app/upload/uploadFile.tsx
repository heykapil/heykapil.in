"use client";
import { useState } from "react";
import { usePresignedUpload } from "next-s3-upload";
import { saveUploadHistory } from "app/db/actions";
import { useRef } from "react";
import { FormSubmitButton } from "./submitButton";
function getDisplayTime() {
  return new Date().toISOString().split("T")[0];
}
export default function UploadComponent() {
  let [fileUrl, setFileUrl] = useState("");
  let [filename, setFileName] = useState("");
  let [filesize, setFileSize] = useState("");
  const [currentDate, setCurrentDate] = useState();
  let { FileInput, openFileDialog, uploadToS3, files } = usePresignedUpload();
  const formRef = useRef<HTMLFormElement>(null);
  let handleFileChange = async (file: File, event: any) => {
    // @ts-ignore
    setCurrentDate(getDisplayTime());
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 100 * 1000 * 1024) {
        alert(
          "File size is greater than 100 MB. Reduce size of image before uploading."
        );
        return false;
      }
    }
    let { url } = await uploadToS3(file);
    // @ts-ignore
    setFileUrl(url.replace("https://s3.tebi.io/", "https://"));
  };

  return (
    <div>
      <form
        ref={formRef}
        className="flex flex-col justify-between space-y-2"
        action={async (formData: FormData) => {
          await saveUploadHistory(formData);
        }}
      >
        <FileInput onChange={handleFileChange} />
        <button
          type="button"
          aria-roledescription="upload file"
          className="w-fit space-x-1 border border-gray-500 border-opacity-50 rounded-lg p-2 gap-1"
          onClick={openFileDialog}
        >
          Select file
        </button>
        <div className="pt-1">
          {files.map((file, index) => (
            <div className="flex flex-row items-center" key={index}>
              <progress
                value={file.progress}
                max={100}
                className="h-4 animate-pulse"
              />
              <input
                name="filename"
                className="hidden"
                type="string"
                value={file.file.name}
                onChange={(e) => setFileName(e.target.value)}
                hidden
              />
              <input
                name="filesize"
                className="hidden"
                type="number"
                value={file.file.size}
                onChange={(e) => setFileSize(e.target.value)}
                hidden
              />
              {file.progress.toFixed(2)} %
            </div>
          ))}
        </div>
        {filename && (
          <div>
            {filename} ({filesize} kb)
          </div>
        )}
        {fileUrl && (
          <div>
            <a
              href={fileUrl}
              className="text-blue-600 dark:text-blue-300 underline"
              target="_blank"
            >
              {fileUrl}
            </a>
          </div>
        )}
        <input
          name="fileurl"
          className="hidden"
          type="url"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          hidden
        />
        <input
          className="hidden"
          type="text"
          id="uploaded_at"
          name="uploaded_at"
          value={currentDate}
          onChange={(e) => e.target.value}
          hidden
        />
        <FormSubmitButton
          type="submit"
          className="w-fit space-x-1 border border-gray-500 border-opacity-50 rounded-lg p-2 gap-1"
          pendingState={
            <p className="flex items-center gap-1">Submitting ...</p>
          }
          // @ts-ignore
          onClick={() => setCurrentDate(getDisplayTime())}
        >
          Save
        </FormSubmitButton>
      </form>
    </div>
  );
}
