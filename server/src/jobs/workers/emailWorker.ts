import { Worker, Job } from "bullmq";
import { EmailJobData } from "../queues/emailQueue";
import logger from "../../utils/logger";
import sendMail from "../../utils/nodemailer";
import { bullClient } from "../../configs/bullmq";

const emailWorker = new Worker(
  "emailQueue",
  async (job: Job<EmailJobData, void>) => {
    const { email, subject, text } = job.data;
    try {
      await sendMail({ email, text, subject });
    } catch (err: any) {
      logger.error(`Failed to send email to ${email}: ${err.message}`);
    }
  },
  {
    connection: bullClient,
    maxStalledCount: 3,
    limiter: {
      max: 5,
      duration: 2000,
    },
    removeOnComplete: {
      age: 0,
      count: 0,
    },
  }
);

emailWorker.on("failed", (job: Job<EmailJobData>, err: any) => {
  logger.error(`Email Worker encountered an error: ${err.message}`);
});

emailWorker.on("completed", (job: Job<EmailJobData>) => {
  logger.info(`Email sent successfully to ${job.data.email}`);
});
