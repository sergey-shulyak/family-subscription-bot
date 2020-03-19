import { CronJob } from "cron"
import logger from "../config/logger"
import { nextBillingDate, getPaymentPrice } from "../services/paymentService"
import { Context } from "telegraf"
import env from "../config/env"
import { getChatIdsForPayment } from "../services/userService"
import paymentMessages from "../messages/ru/paymentMessages"

export function setUpJob(ctx: Context): [CronJob, string] {
  logger.info("Setting up a Payment Reminder Job")

  const nextPaymentDate = nextBillingDate()
  const cronTime = `0 12 ${nextPaymentDate.date()} * *`

  const handler: () => void = async () => {
    const paymentPrice = await getPaymentPrice(
      env.SUBSCRIPTION_PRICE_PER_MEMBER
    )

    const chatIds = await getChatIdsForPayment()

    const messagePromises = chatIds.flatMap((cId: number) => [
      ctx.telegram.sendMessage(
        cId,
        paymentMessages.paymentDetails(
          env.SUBSCRIPTION_TITLE,
          paymentPrice,
          env.SUBSCRIPTION_PRICE_PER_MEMBER
        )
      ),
      ctx.telegram.sendMessage(
        cId,
        paymentMessages.cardNumber(env.SUBSCRIPTION_CARD_NUMBER)
      )
    ])

    return Promise.all(messagePromises)
  }

  return [new CronJob(cronTime, handler), "PaymentReminderJob"]
}
