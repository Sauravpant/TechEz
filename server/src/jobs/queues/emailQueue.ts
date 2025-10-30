import { Queue } from "bullmq";
import { bullClient } from "../../configs/bullmq";

export interface EmailJobData {
  email: string;
  subject: string;
  text: string;
}

export const emailQueue = new Queue<EmailJobData, any>("emailQueue", {
  connection: bullClient,
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  },
});

