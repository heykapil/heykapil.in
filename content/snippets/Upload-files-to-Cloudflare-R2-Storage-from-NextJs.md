---
title: Upload files to Cloudflare R2 Storage from NextJS
description: We will use the S3 api of the R2 to upload the file and get an access url.
logo: next.svg
id: 45eae164f0
datetimeCreate: 2023-10-21 13:58:45
datetimeUpdate: 2023-10-21 14:57:16
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

We'll use the following package [`next-s3-upload`](https://next-s3-upload.codingvalue.com)

```bash
bun add next-s3-upload
```

Go to the Cloudflare dashboard and create and R2 bucket.

- Once the bucket is created. Select the bucket. Go to it's settings and edit the CORS policy.

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

- Copy the `S3 API` from the bucket details of the settings. It will look like this.

`https://<Account_ID>.r2.cloudflarestorage.com/<name-of-bucket>`

- Go to Public access setting of the bucket and set a custom domain to access the files of the bucket.

- Now create the `ACCESS ID` and `SECRET_ID` api tokens to connect to the R2 storage from `https://dash.cloudflare.com/<Account_ID>/r2/api-tokens`

- Save these as the environment variables in `.env` file in the root of the NextJs project.

Create an API route that will process the upload of the file.

```javascript title="pages/api/s3-upload.js"
import { APIRoute } from "next-s3-upload";

export default APIRoute.configure({
  accessKeyId: process.env.R2_ACESSS_ID,
  secretAccessKey: process.env.R2_SECRET_ID,
  bucket: "name-of-bucket",
  region: "us-east-1",
  endpoint: "`https://<ACCOUNT_ID>.r2.cloudflarestorage.com` endpoint.",
});
```

Last step is to create a react component which use the API to uploads the file and return the public access URL.

```javascript
"use client";
import { useState } from "react";
import { usePresignedUpload } from "next-s3-upload";

export default function UploadComponent() {
  let [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = usePresignedUpload();

  let handleFileChange = async (file) => {
    let { url } = await uploadToS3(file);

    setImageUrl(
      url.replace(
        "https://<Account_ID>.r2.cloudflarestorage.com/<bucket-name>",

        "https://custom-domain.domain.com"
      )
    );
  };

  return (
    <div>
      <FileInput onChange={handleFileChange} />

      <button onClick={openFileDialog}>Upload file</button>

      {imageUrl && <img src={imageUrl} />}
    </div>
  );
}
```
