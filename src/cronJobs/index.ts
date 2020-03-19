import { Context } from "telegraf"
import { setUpJob as setUpPaymentReminderJob } from "./paymentReminderJob"
import logger from "../config/logger"

const jobSetUppers = [setUpPaymentReminderJob]

export function startCronJobs(ctx: Context): void {
  jobSetUppers.forEach((setUpper) => {
    const [job, name] = setUpper(ctx)
    logger.debug(`${name} is set up`)

    logger.debug(`${name} is starting`)
    job.start()
    logger.info(`${name} has started`)

    logger.debug(`Next date for job to run: ${job.nextDate()}`)
  })
}
