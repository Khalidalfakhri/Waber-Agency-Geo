import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";
import { db } from "@workspace/db";
import { contactSubmissionsTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

const CONTACT_EMAIL = "Info@waberagency.com";

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// POST /api/contact — receive form submission, persist to DB, attempt email
router.post("/contact", async (req, res) => {
  const { name, phone, service, message } = req.body as {
    name?: string;
    phone?: string;
    service?: string;
    message?: string;
  };

  if (!name?.trim() || !phone?.trim() || !service?.trim()) {
    res.status(400).json({ error: "الاسم والهاتف والخدمة مطلوبة" });
    return;
  }

  const submission = {
    name: name.trim(),
    phone: phone.trim(),
    service: service.trim(),
    message: message?.trim() ?? "",
  };

  // 1. Persist to database — required for success; email is best-effort only
  let savedId: number;
  try {
    const [row] = await db
      .insert(contactSubmissionsTable)
      .values(submission)
      .returning({ id: contactSubmissionsTable.id });
    if (!row) throw new Error("insert returned no row");
    savedId = row.id;
    logger.info({ id: savedId, submission }, "contact submission saved to db");
  } catch (err) {
    logger.error({ err, submission }, "failed to save contact submission to db");
    res.status(500).json({ error: "حدث خطأ أثناء حفظ الطلب، يرجى المحاولة مرة أخرى" });
    return;
  }

  // 2. Always log server-side
  logger.info({ submission }, "contact form submission received");

  // 3. Send email if SMTP is configured
  const transporter = createTransporter();

  if (transporter) {
    try {
      const emailBody = `
استفسار جديد من موقع وبر الإبداعية
=====================================

الاسم: ${submission.name}
رقم الهاتف: ${submission.phone}
الخدمة المطلوبة: ${submission.service}
الرسالة: ${submission.message || "—"}

التاريخ: ${new Date().toISOString()}
رقم السجل: #${savedId ?? "—"}
      `.trim();

      await transporter.sendMail({
        from: `"موقع وبر الإبداعية" <${process.env.SMTP_USER}>`,
        to: CONTACT_EMAIL,
        subject: `استفسار جديد من ${submission.name} — ${submission.service}`,
        text: emailBody,
        replyTo: undefined,
      });

      logger.info({ to: CONTACT_EMAIL }, "contact email sent successfully");
    } catch (err) {
      // Log the error but don't fail the user — the submission is already saved
      logger.error({ err }, "failed to send contact email");
    }
  } else {
    logger.warn(
      "SMTP not configured (set SMTP_HOST, SMTP_USER, SMTP_PASS). Submission saved to DB only.",
    );
  }

  res.status(200).json({ success: true, id: savedId });
});

// GET /api/contact/submissions — retrieve all leads (admin)
// Simple key-based protection via ADMIN_KEY env var; if not set, endpoint is disabled.
router.get("/contact/submissions", async (req, res) => {
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey) {
    res
      .status(503)
      .json({ error: "Admin endpoint not enabled. Set ADMIN_KEY env var." });
    return;
  }

  const provided = req.headers["x-admin-key"] ?? req.query["key"];
  if (provided !== adminKey) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const rows = await db
      .select()
      .from(contactSubmissionsTable)
      .orderBy(desc(contactSubmissionsTable.createdAt))
      .limit(200);

    res.status(200).json({ total: rows.length, submissions: rows });
  } catch (err) {
    logger.error({ err }, "failed to fetch contact submissions");
    res.status(500).json({ error: "Failed to retrieve submissions" });
  }
});

export default router;
