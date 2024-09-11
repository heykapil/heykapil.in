---
id: dc5577e9f8
title: Setting up tebi s3 bucket
description: Na.
datetimeCreate: 2023-11-06 14:31:13
datetimeUpdate: 2023-11-06 17:24:18
logo: next.svg
created: 2023-12-14T18:14
updated: 2023-12-14T18:14
---

## Tebi

- Go to [Tebi dashboard](http://client.tebi.io)
- Create a new account, and create a bucket with name as your desired custom domain name `subdomain.domain.tld`
- Go to the DNS settings of your `domain.tld` and create a CNAME record to map your subdomain to access files not only from the `subdomain.domain.tld.s3.tebi.io` or `s3.tebi.io/subdomain.domain.tld` but also from your subdomain `subdomain.domain.tld`.
  ```
  subdomain CNAME subdomain.domain.tld.s3.tebi.io
  ```
- Create a new access key and secret key with proper roles and copy these as environment variables.
- Change Access control settings to public.
- Edit the CORS Policy and enable it.
  ```xml
  <?xml version='1.0' encoding='UTF-8'?>
  <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
      <CORSRule>
          <AllowedOrigin>*</AllowedOrigin>
          <AllowedMethod>HEAD</AllowedMethod>
          <AllowedMethod>GET</AllowedMethod>
          <AllowedMethod>POST</AllowedMethod>
          <AllowedMethod>PUT</AllowedMethod>
          <AllowedHeader>*</AllowedHeader>
        <ExposeHeader>ETAG</ExposeHeader>
      </CORSRule>
  </CORSConfiguration>
  ```
- Edit the bucket policy and enable it.
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "PublicReadGetPutObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": ["s3:GetObject", "s3:PutObject"],
        "Resource": "*",
        "Condition": {}
      }
    ]
  }
  ```
- Edit the lifecycle rule and enable it.

  ```xml
  <?xml version='1.0' encoding='UTF-8'?>
  <LifecycleConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Rule>
      <ID>UPLOADS</ID>
      <Status>Enabled</Status>
      <AbortIncompleteMultipartUpload>
          <DaysAfterInitiation>1</DaysAfterInitiation>
      </AbortIncompleteMultipartUpload>
  </Rule>
  </LifecycleConfiguration>
  ```

- Go to hosting, enable it and generate for https/SSL certificate as well.
- Now, we have the following environment variables.
  ```
  TEBI_CLIENT_KEY=""
  TEBI_SECRET_KEY=""
  TEBI_SGP_ENDPOINT="https://s3.sgp.tebi.io"
  TEBI_ENDPOINT="https://s3.tebi.io"
  TEBI_BUCKET_NAME="subdomain.domain.tld"
  TEBI_UPLOAD_REGION="global"
  ```

Now follow the steps as in [Upload files to Cloudflare R2 Storage from NextJs](Upload%20files%20to%20Cloudflare%20R2%20Storage%20from%20NextJs)

- Api endpoint will be something like this:

  ```js
  // pages/api/s3-upload.js

  import { APIRoute, sanitizeKey, uuid } from "next-s3-upload";
  let date = new Date();
  let unixTimeStamp = Math.floor(date.getTime() / 1000);
  let year = date.getFullYear();
  let months = date.getMonth() + 1;
  let day = date.getDate();
  export default APIRoute.configure({
    key(req, filename) {
      return `files/${day}-${months}-${year}-${unixTimeStamp}/${uuid()}/${sanitizeKey(
        filename
      )}`;
    },
    accessKeyId: process.env.TEBI_CLIENT_KEY,
    secretAccessKey: process.env.TEBI_SECRET_KEY,
    bucket: process.env.TEBI_BUCKET_NAME,
    region: process.env.TEBI_UPLOAD_REGION,
    endpoint: process.env.TEBI_ENDPOINT,
  });
  ```

Any file uploaded `file-name.extension` can be accessed from three URLs.

- `https://subdomain.domain.tld.s3.tebi.io/.../file-name.extension`
- `https://s3.tebi.io/subdomain.domain.tld/.../file-name.extension`
- `https://subdomain.domain.tld/.../file-name.extension`
  where the route `...` is same as defined in the APIRoute request.
  `files/${day}-${months}-${year}-${unixTimeStamp}/${uuid()}`
  Read more at the documentation of tebi at [docs.tebi.io/](https://docs.tebi.io/intro/getting_started.html)
