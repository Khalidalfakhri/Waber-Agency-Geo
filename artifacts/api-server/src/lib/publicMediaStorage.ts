import { Storage, type File } from "@google-cloud/storage";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

export const objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token",
      },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

function parseObjectPath(value: string): { bucketName: string; objectName: string } {
  const normalized = value.startsWith("/") ? value : `/${value}`;
  const parts = normalized.split("/");
  if (parts.length < 3 || !parts[1]) {
    throw new Error("Invalid public object search path");
  }

  return {
    bucketName: parts[1],
    objectName: parts.slice(2).join("/"),
  };
}

export async function findPublicMedia(filePath: string): Promise<File | null> {
  if (
    !filePath ||
    filePath.startsWith("/") ||
    filePath.includes("\\") ||
    filePath.split("/").some((part) => !part || part === "." || part === "..")
  ) {
    return null;
  }

  const searchPaths = (process.env.PUBLIC_OBJECT_SEARCH_PATHS ?? "")
    .split(",")
    .map((path) => path.trim())
    .filter(Boolean);

  if (searchPaths.length === 0) {
    throw new Error("Public object storage is not configured");
  }

  for (const searchPath of searchPaths) {
    const { bucketName, objectName } = parseObjectPath(
      `${searchPath}/${filePath}`,
    );
    const file = objectStorageClient.bucket(bucketName).file(objectName);
    const [exists] = await file.exists();
    if (exists) return file;
  }

  return null;
}