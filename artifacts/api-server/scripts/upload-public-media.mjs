import { Storage } from "@google-cloud/storage";

const SIDECAR = "http://127.0.0.1:1106";
const storage = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${SIDECAR}/token`,
    type: "external_account",
    credential_source: {
      url: `${SIDECAR}/credential`,
      format: { type: "json", subject_token_field_name: "access_token" },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

const searchPath = (process.env.PUBLIC_OBJECT_SEARCH_PATHS ?? "")
  .split(",")
  .map((path) => path.trim())
  .find(Boolean);

if (!searchPath) throw new Error("Public object storage is not configured");

const parts = (searchPath.startsWith("/") ? searchPath : `/${searchPath}`)
  .split("/")
  .filter(Boolean);
if (parts.length < 1) throw new Error("Invalid public object storage path");

const bucket = storage.bucket(parts[0]);
const prefix = parts.slice(1).join("/");
const objectName = [prefix, "agency/showreel.mp4"].filter(Boolean).join("/");
const localFile = "../../artifacts/loop-agency/public/showreel.mp4";

await bucket.upload(localFile, {
  destination: objectName,
  resumable: true,
  metadata: {
    contentType: "video/mp4",
    cacheControl: "public, max-age=3600",
  },
});

console.log(`Uploaded ${localFile} as agency/showreel.mp4`);