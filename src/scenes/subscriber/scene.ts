import { BaseScene } from "telegraf"
import { subscriberMenu } from "./menus"
import { Scene } from "../sceneEnum"
import subscriberMessages from "../../messages/ru/subscriberMessages"
import { UserService } from "../../services/userService"
import { PaymentService } from "../../services/paymentService"
import { DataError } from "../../errors/customErrors"

const subscriberScene = new BaseScene(Scene.Subscriber)

subscriberScene.enter(async (ctx) => {
  return ctx.replyWithMarkdown(
    subscriberMessages.SUBSCRIBER_HEADER,
    subscriberMenu
  )
})

subscriberScene.hears(
  subscriberMessages.SUBSCRIBER_GET_SUBSCRIPTION_INFO,
  async (ctx) => {
    const adminInfo = await UserService.getAdminInfo()

    return ctx.replyWithMarkdown(subscriberMessages.subscriptionInfo(adminInfo))
  }
)

subscriberScene.hears(
  subscriberMessages.SUBSCRIBER_GET_PAYMENT_INFO,
  async (ctx) => {
    const tId = ctx.from?.id

    if (tId === undefined) {
      throw new DataError("Current user id is missing")
    }

    const paymentInfo = await PaymentService.getPaymentInfoForSubscriber(tId)

    return ctx.replyWithMarkdown(subscriberMessages.paymentStatus(paymentInfo))
  }
)

export default subscriberScene
