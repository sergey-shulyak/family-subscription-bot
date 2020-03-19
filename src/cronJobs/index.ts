import { setUpJob as setUpPaymentReminderJob } from "./paymentReminderJob"
import logger from "../config/logger"
import { bot } from "../bot"

const jobSetUppers = [setUpPaymentReminderJob]

export function startCronJobs(): void {
  jobSetUppers.forEach((setUpper) => {
    const [job, name] = setUpper(bot)
    logger.debug(`${name} is set up`)

    logger.debug(`${name} is starting`)
    job.start()
    logger.info(`${name} has started`)

    logger.debug(`Next date for job to run: ${job.nextDate()}`)
  })
}
