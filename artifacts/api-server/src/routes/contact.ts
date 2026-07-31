import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

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
    receivedAt: new Date().toISOString(),
  };

  // Always log the submission server-side
  logger.info({ submission }, "contact form submission received");

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

التاريخ: ${submission.receivedAt}
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
      // Log the error but don't fail the user — the submission was logged
      logger.error({ err }, "failed to send contact email");
    }
  } else {
    logger.warn(
      "SMTP not configured (set SMTP_HOST, SMTP_USER, SMTP_PASS). Submission logged only.",
    );
  }

  res.status(200).json({ success: true });
});

export default router;
