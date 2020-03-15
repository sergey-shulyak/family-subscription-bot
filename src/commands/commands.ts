import { Middleware, SceneContextMessageUpdate, Stage } from "telegraf"
import paymentMessages from "../messages/ru/paymentMessages"
import { getPaymentPrice } from "../services/paymentService"
import env from "../config/env"
import currencyMap from "../common/currencyMap"
import { getChatIdsForPayment } from "../services/userService"

const commands: Map<string, Middleware<SceneContextMessageUpdate>> = new Map([
  // Navigation commands
  ["greeter", Stage.enter("greeter")],
  [
    // Bot commands

    // Payment commands
    "sendSubscriptionInvoice",
    async (ctx: SceneContextMessageUpdate) => {
      const paymentPrice = await getPaymentPrice()

      const chatIds = await getChatIdsForPayment()

      const messagePromises = chatIds.flatMap((cId: number) => [
        ctx.telegram.sendMessage(
          cId,
          paymentMessages.paymentDetails(
            env.SUBSCRIPTION_TITLE,
            paymentPrice,
            currencyMap[env.PAYMENT_CURRENCY]
          )
        ),
        ctx.telegram.sendMessage(
          cId,
          paymentMessages.cardNumber(env.SUBSCRIPTION_CARD_NUMBER)
        )
      ])

      return Promise.all(messagePromises)
    }
  ]
])

export default commands
