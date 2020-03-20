import { CronJob } from "cron"

import { nextBillingDate, getPaymentPrice } from "../services/paymentService"
import { getChatIdsForPayment } from "../services/userService"
import paymentMessages from "../messages/ru/paymentMessages"

import logger from "../config/logger"
import env from "../config/env"
import { Bot } from "../types/bot"
import { confirmPaymentMenu } from "../scenes/payment/menus"

export function setUpJob(bot: Bot): [CronJob, string] {
  logger.info("Setting up a Payment Reminder Job")

  const nextPaymentDate = nextBillingDate()
  const cronTime = `*/1 * ${nextPaymentDate.date()} * *`

  const handler: () => void = async () => {
    const paymentPrice = await getPaymentPrice(
      env.SUBSCRIPTION_PRICE_PER_MEMBER
    )

    const chatIds = await getChatIdsForPayment()

    const messagePromises = chatIds.map((cId: number) => [
      bot.telegram.sendMessage(
        cId,
        paymentMessages.paymentDetails(
          env.SUBSCRIPTION_TITLE,
          paymentPrice,
          env.SUBSCRIPTION_PRICE_PER_MEMBER,
          env.SUBSCRIPTION_CARD_NUMBER
        ),
        confirmPaymentMenu
      )
    ])

    return Promise.all(messagePromises)
  }

  return [new CronJob(cronTime, handler), "PaymentReminderJob"]
}
