---
id: 75dc0b8f-72a9-40a6-b9ca-4b0c89bf4a4e
title: Making terabox as S3 compatible service
created: 2026-02-26T11:56:21Z
updated: 2026-02-26T12:59:54Z
tags: [s3,encore,terabox]
---
## Tebi S3
Tebi.io is an awesome S3 compatible provider which offers a good free tier of 25GB and good bandwidth. I used to have multiple free buckets at the [https:/drive.kapil.app](https:%E2%80%B8drive.kapil.app) for my storage of files, db backups, mail storage and others. However, it has announced to be shut down on 31st March, 2026. Almost all the S3 storage providers are either paid, or offer trial/limited quota of (5-10GB) with restrictions on it for free users and it is obviously fine as they have to cover the costs, and that's how businesses work. What i like about S3 or compatible storages is the API to interact with. Usually there are two classes of API opreration, we perform - Class A  (`PutObject, CopyObject, PostObject, ListObject, CreateMultipartUpload, UploadPart, CompleteMultipartUpload`) and Class B (`GetObject, SelectObjectContent`). These operations are charged in the billing of each S3 bucket. Class B operations are usually less expensive. Also, when we retrieve the file, we can put a CDN in front of bucket as well for caching to prevent hitting another operation on bucket. So, file retrival is easy but uploading or creating new files in S3 buckets is expensive. So, there are two options.

1. Deploy your own self-hosted S3 server like Minio etc. (here we avoid operation charges but storage is limited to the server configured storage). This is really good idea, you pay for the server and use it as storage. But I already have too much workload on my server and don't want to use a free powerful ARM Oracle cloud instance just for storage uses.
2. Look for a storage option which is good, but uses Ads to cover the costs, has API (official/unofficial) to file retrieval and upload purpose. we can then spoof our api endpoint to look alike the S3 compatible.

## Terabox
Terabox is an app known for its free 1 TB storage offering to users. Thus, it is often used to share pirated, cracked, or modded applications, adult content, and other illegal files, which may result in it being banned by some governments. Another problem with it is there are too many ads (which obviously will be there to cover the costs, or one have to pay in the form of pro/premium subscription so as not to show ads) and does not have any official api (you have to use mobile app or web based terabox site to access the files - a classic vendor lockin problem.. you need to have our app to view your own files) which will be obviously solved in our guide. Further, there is a concern about privacy. Storing files on the cloud is never safe; basically, you are saving files in someone else's computer, be it Google, Microsoft, Terabox, or some fancy or non-fancy company. Each cloud provider has access to the user data, provided they may or may not sell it to others. But all of them can see what you have in your account. Be it American, Chinese, or any country-specific. Here comes the encryption in the play. What if you encrypt the files using a password or secret key? Yes, this is a way, but encryption and decryption consume CPU and take time. But you can always optimize it by processing data in smaller chunks (splitting a large file into smaller files) and using a stream instead of storing the whole large file as a buffer in RAM. Also, the file can be encrypted on the go while uploading it, so that only you have access to your file decryption. Once we have our unofficial working api, then we do not have to use the terabox app or see any ads or any government restrictions to access the files as long as terabox is working. Also, there will be no privacy concerns as our files will be encrypted. Bang! We have the encrypted file storage of 1 TB. Also, we can spoof our API to work alike S3 storage and accept the connections from any S3 compatible APIs.

## Prerequisites

1. Terabox account (credentials preferred - email and password)
2. A working node.js backend application (I am using Encore.ts. For express/cf-worker or others,)

---

## Dependency and login

I am using the `terabox-api` package along with some custom patches (for the credential login, streaming, and transfers). Terabox requires the headers (`User-Agent, Referer, Origin`) and cookies mainly `ndus, browserid, csrfToken` etc. to identify the requesting user. One way is to manually get these cookies and headers from the developer mode of browser (which mostly people are doing) and then use these headers and cookies for further requests.

```bash
npm install terabox-api // install the dependency
```

For credentials.. one can use (but problem with this was: somehow `ndus` cookie was not being  in the credentials)

```ts
import TeraboxApp from 'terabox-api' // ts might complaint here

const app = new TeraBoxApp('');
    app.params.ua = userAgent;
    app.params.whost = 'https://www.1024terabox.com';
    let preLogin;
    preLogin = await app.passportPreLogin(email);
   
    const preLoginOk = preLogin.errno === 0 || preLogin.code === 0 || (preLogin.errno === null && preLogin.data);
    if (!preLoginOk) {
        throw APIError.unauthenticated(`Terabox pre-login failed: ${preLogin.show_msg || preLogin.errno || preLogin.code}`);
    }

    const loginResult = await app.passportLogin(preLogin.data, email, password);
    const loginOk = loginResult.errno === 0 || loginResult.code === 0;
    if (!loginOk) {
        throw APIError.unauthenticated(`Terabox login failed: ${loginResult.show_msg || loginResult.errno || loginResult.code}`);
    }

    // Update app data after login
    try {
        await app.updateAppData();
    } catch (e: any) {
        log.warn('Post-login updateAppData failed', { error: e.message });
    }

	const loginCheck = await app.checkLogin();
	const sessionValid = loginCheck.errno === 0 || (loginCheck.errno === null && loginCheck.code === 0);
```

Now, if login succeeds and there is a valid session then further requests can be made. A better approach is the save this `app` in the memory cache to avoid multiple logins (on every request) which will consume time, and account can be flagged by terabox as well.

Also, try to check the cookies in the passport login as well.. Does it include the `ndus` and other cookie or not? If it does.. then you can save this cookie (either in redis or db) and can use this cookie to make subsequent requests,  a cookie refresh logic for the expired cookies can be built around these credentials as well. (However only `ndus` cookie was missing for my case, rest all `browserid, csrfToken` were there, although credential login was successful, so i wrote a patch for this. Now i extract, save and use this cookie till expiry/error then a schedule job/error will trigger cookie refresh and update logic.)

## Terabox API logics

Check out the module documentation for available commands > [https://seiya-npm.github.io/terabox-api/html/index.html](https://seiya-npm.github.io/terabox-api/html/index.html)

a few points before i proceed to the data encryption.

- File upload happens to different sub-domain/host (different from `whost`), you can get that by `app.getRemoteHost()`.
- For large size file uploads, use `precreateFile() > uploadChunks() > createFile()`, similar to what we see in multipart uploads of S3.
- For file meta, download, and stream, use `getFileMeta(), download(), getStream()`.

## Encrypting Files

There are various encryption algrothims you can use depending on your use case. I am using `AES-256-CTR`. As I want to `byte-range` header and stream to work for the encrypted content as well. However, there is disadvantage of data integrity.

```ts
import crypto from 'node:crypto';

/**
 * Standard encryption result
 */
export interface EncryptedResult {
    buffer: Buffer;
    keyHex: string;
    ivHex: string;
}

/**
 * Encrypt buffer using AES-256-CTR
 * We use CTR mode because it allows random access decryption (seeking) easily,
 * which is crucial for streaming video (Range requests).
 */
export function encryptBuffer(buffer: Buffer): EncryptedResult {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    // CTR mode: stream cipher, length matches input
    const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);

    const encrypted = Buffer.concat([
        cipher.update(buffer),
        cipher.final()
    ]);

    return {
        buffer: encrypted,
        keyHex: key.toString('hex'),
        ivHex: iv.toString('hex')
    };
}

/**
 * Decrypt buffer using AES-256-CTR
 */
export function decryptBuffer(buffer: Buffer, keyHex: string, ivHex: string): Buffer {
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);

    const decrypted = Buffer.concat([
        decipher.update(buffer),
        decipher.final()
    ]);

    return decrypted;
}

/**
 * Create a decipher for a specific byte range.
 * This is the magic that makes 'aes-256-ctr' great for proxying video.
 * We can start decrypting at any byte offset without reading the whole file.
 */
export function createRangeDecipher(keyHex: string, ivHex: string, startOffset: number) {
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');

    // In CTR mode, we can compute the counter block for the given offset.
    // AES block size is 16 bytes.
    // The counter is valid for (offset / 16) blocks.
    // We increment the IV (acting as counter) by that amount.

    const blockIndex = Math.floor(startOffset / 16);
    const withinBlockOffset = startOffset % 16;

    // Increment the IV (big-endian 128-bit integer) by blockIndex
    // Since JS numbers lose precision above 2^53, we use BigInt or manual buffer math.
    const ivBigInt = BigInt('0x' + iv.toString('hex'));
    const currentCounter = ivBigInt + BigInt(blockIndex);

    // Convert back to Buffer (16 bytes)
    let newIvHex = currentCounter.toString(16);
    // Pad with leading zeros if needed
    while (newIvHex.length < 32) newIvHex = '0' + newIvHex;
    const newIv = Buffer.from(newIvHex, 'hex');

    // Create decipher with the advanced counter
    const decipher = crypto.createDecipheriv('aes-256-ctr', key, newIv);

    // If we are starting in the middle of a block, we need to consume (discard) the first bytes
    // so that the stream aligns with our specific byte offset.
    if (withinBlockOffset > 0) {
        // Encrypt dummy zeros to advance the keystream state
        // (CTR mode encrypt/decrypt is symmetrical XOR with keystream)
        const dummy = Buffer.alloc(withinBlockOffset, 0);
        decipher.update(dummy);
    }

    return decipher;
}
```


The AWS SDK speaks "S3 Protocol" (XML responses, AWS Signature v4, specific headers). Your Encore app needs to intercept these, translate them into Terabox commands, and return the data in the format the AWS SDK expects (often XML).

Here is the architectural plan and the Encore.ts implementation guide.

### The **Architecture**

1. **The Interface:**  Create an Encore API with routes that match S3 URL patterns (`/:bucket/*key`).
2. **The Translation:**

   - **GET (Download):**  Proxy the binary stream from Terabox -\> Client.
   - **PUT (Upload):**  Stream the request body -\> Terabox Upload API.
   - **GET (List):**  Call Terabox List -\> Convert JSON result to **S3 XML format**.
3. **Note:**  The AWS SDK requires credentials. On your server, you can simply **ignore** the signature verification (since you trust the client or the project is private) and accept any dummy credentials provided by the SDK or create a middleware like this to verify the requests (if project is public).

   ```ts
   import * as crypto from "crypto";
   import { IncomingMessage } from "http";

   interface Credentials {
     accessKeyId: string;
     secretAccessKey: string;
   }

   // Mock Database lookup - Replace with your actual DB call/ Redis call
   async function getSecretKey(accessKeyId: string): Promise<string | null> {
     const secrets: Record<string, string> = {
       "my-access-key": "my-secret-key", // The keys your client uses
     };
     return secrets[accessKeyId] || null;
   }

   export async function verifyS3Request(req: IncomingMessage, body: Buffer): Promise<boolean> {
     const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith("AWS4-HMAC-SHA256")) return false;

     // 1. Parse Authorization Header
     // Format: AWS4-HMAC-SHA256 Credential=AKIA.../20231010/us-east-1/s3/aws4_request, ...
     const [algo, params] = authHeader.split(" ");
     const paramMap = params.split(",").reduce((acc, p) => {
       const [k, v] = p.trim().split("=");
       acc[k] = v;
       return acc;
     }, {} as Record<string, string>);

     const credentialParts = paramMap["Credential"].split("/");
     const accessKeyId = credentialParts[0];
     const dateStamp = credentialParts[1];
     const region = credentialParts[2];
     const service = credentialParts[3];
     
     // 2. Fetch Secret Key
     const secretKey = await getSecretKey(accessKeyId);
     if (!secretKey) return false;

     // 3. Reconstruct Canonical Request
     const method = req.method?.toUpperCase();
     const uri = req.url?.split("?")[0] || "/"; // Path without query
     const queryString = req.url?.split("?")[1] || "";
     
     // Sort query parameters (AWS requirement)
     const canonicalQueryString = queryString
       .split("&")
       .sort()
       .map(p => p.split("=").map(c => decodeURIComponent(c).replace(/\+/g, "%20")).join("=")) // basic normalization
       .join("&");

     // Canonical Headers (Must be lowercase, sorted)
     const signedHeadersKeys = paramMap["SignedHeaders"].split(";");
     const canonicalHeaders = signedHeadersKeys
       .map(key => `${key}:${(req.headers[key] as string || "").trim()}\n`)
       .join("");

     // Payload Hash
     // S3 often sends 'UNSIGNED-PAYLOAD' in x-amz-content-sha256 for uploads to avoid buffering
     let payloadHash = req.headers["x-amz-content-sha256"] as string;
     if (payloadHash === "UNSIGNED-PAYLOAD" || !payloadHash) {
        // If unsigned, we don't hash the body, we just use the string literal
        payloadHash = "UNSIGNED-PAYLOAD"; 
     } else if (payloadHash !== crypto.createHash("sha256").update(body).digest("hex")) {
        // If strict checking is enabled, you'd calculate the body hash here
        // payloadHash = crypto.createHash("sha256").update(body).digest("hex");
     }

     const canonicalRequest = [
       method,
       uri,
       canonicalQueryString,
       canonicalHeaders,
       paramMap["SignedHeaders"],
       payloadHash
     ].join("\n");

     // 4. Create String to Sign
     const amzDate = req.headers["x-amz-date"] as string;
     const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
     const stringToSign = [
       "AWS4-HMAC-SHA256",
       amzDate,
       credentialScope,
       crypto.createHash("sha256").update(canonicalRequest).digest("hex")
     ].join("\n");

     // 5. Calculate Signature
     const kSecret = `AWS4${secretKey}`;
     const kDate = hmac(kSecret, dateStamp);
     const kRegion = hmac(kDate, region);
     const kService = hmac(kRegion, service);
     const kSigning = hmac(kService, "aws4_request");
     
     const calculatedSignature = hmacHex(kSigning, stringToSign);

     // 6. Compare
     return calculatedSignature === paramMap["Signature"];
   }

   // Helpers
   function hmac(key: string | Buffer, data: string) {
     return crypto.createHmac("sha256", key).update(data).digest();
   }
   function hmacHex(key: string | Buffer, data: string) {
     return crypto.createHmac("sha256", key).update(data).digest("hex");
   }
   ```

   - **`forcePathStyle: true`**: This is non-negotiable for spoofing. Without it, the SDK tries to connect to `my-terabox-bucket.api.kapil.app` instead of `api.kapil.app/my-terabox-bucket`, which will fail DNS resolution.
   - **XML is Strict**: The `ListObjects` response *must* match the S3 XML schema structure (Name, Prefix, Contents, Key, etc.) or the AWS SDK will throw an XML parsing error.
   - **Content-Length**: For uploads (`PUT`), S3 usually sends a `Content-Length` header. Ensure your Terabox uploader can handle streams if the length is large, or buffer it if Terabox requires the full file at once.
   - **Presigned-URLs**: For multipart uploads, we create presigned urls with query parameters containing access key id, signature, and other information, that can be made to use same verifyS3Request to parse information from search query params instead of Authorization header. Further, additional information like whole file or file chunk md5 hashes, crc-32 values can be passed in metadata while initiating or completing upload from client side.
