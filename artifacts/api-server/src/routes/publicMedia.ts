import { Router, type IRouter, type Request, type Response } from "express";
import type { File } from "@google-cloud/storage";
import { findPublicMedia } from "../lib/publicMediaStorage";

const router: IRouter = Router();

function parseByteRange(
  header: string,
  fileSize: number,
): { start: number; end: number } | null {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || fileSize <= 0) return null;

  let start: number;
  let end: number;
  if (match[1] === "") {
    const suffixLength = Number(match[2]);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return null;
    start = Math.max(fileSize - suffixLength, 0);
    end = fileSize - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === "" ? fileSize - 1 : Number(match[2]);
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) return null;
    end = Math.min(end, fileSize - 1);
  }

  if (start < 0 || start >= fileSize || end < start) return null;
  return { start, end };
}

function streamFile(
  req: Request,
  res: Response,
  file: File,
  range?: { start: number; end: number },
) {
  const stream = file.createReadStream(range);
  stream.on("error", (error) => {
    req.log.error({ err: error }, "Failed to stream public media");
    if (!res.headersSent) res.status(500);
    res.end();
  });
  stream.pipe(res);
}

router.get("/storage/public-objects/*filePath", async (req, res) => {
  try {
    const raw = req.params.filePath;
    const filePath = Array.isArray(raw) ? raw.join("/") : raw;
    const file = await findPublicMedia(filePath);
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    const [metadata] = await file.getMetadata();
    const fileSize = Number(metadata.size ?? 0);
    res.setHeader(
      "Content-Type",
      metadata.contentType ?? "application/octet-stream",
    );
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("X-Content-Type-Options", "nosniff");

    const rangeHeader = req.headers.range;
    if (rangeHeader) {
      const range = parseByteRange(rangeHeader, fileSize);
      if (!range) {
        res.setHeader("Content-Range", `bytes */${fileSize}`);
        res.status(416).end();
        return;
      }

      res.status(206);
      res.setHeader(
        "Content-Range",
        `bytes ${range.start}-${range.end}/${fileSize}`,
      );
      res.setHeader("Content-Length", String(range.end - range.start + 1));
      streamFile(req, res, file, range);
      return;
    }

    res.setHeader("Content-Length", String(fileSize));
    streamFile(req, res, file);
  } catch (error) {
    req.log.error({ err: error }, "Failed to serve public media");
    res.status(500).json({ error: "Failed to serve public media" });
  }
});

export default router;