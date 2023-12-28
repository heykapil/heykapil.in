import { APIRoute, sanitizeKey, uuid } from "next-s3-upload";

export default APIRoute.configure({
  key(req, filename) {
    return `uploads/${uuid()}-${sanitizeKey(filename)}`;
  },
  accessKeyId: process.env.S3_API_KEY,
  secretAccessKey: process.env.S3_API_SECRET,
  bucket: "cdn.kapil.app",
  region: "global",
  endpoint: "https://s3.tebi.io",
});
