import { BaseScene } from "telegraf"
import { subscriberMenu } from "./menus"
import { Scene } from "../sceneEnum"
import subscriberMessages from "../../messages/ru/subscriberMessages"
import { getUserByTelegramId, getAdminInfo } from "../../services/userService"
import {
  getPaymentInfoForSubscriber,
  getPaymentPrice
} from "../../services/paymentService"
import { DataError } from "../../errors/customErrors"
import logger from "../../config/logger"
import env from "../../config/env"

const subscriberScene = new BaseScene(Scene.Subscriber)

subscriberScene.enter(async (ctx) => {
  await ctx.replyWithChatAction("typing")

  const userId = ctx.from?.id

  if (userId === undefined) {
    throw new DataError("No user id is present in context")
  }

  const user = await getUserByTelegramId(userId)

  if (user === null) {
    throw new DataError("Unable to find user in DB")
  }

  ;(ctx as any).session.visited = true

  logger.debug("session", (ctx as any).session)

  const visited: boolean = (ctx as any).session.visited

  return visited
    ? ctx.reply(subscriberMessages.RETURN_TO_MENU, subscriberMenu)
    : ctx.replyWithMarkdown(
        subscriberMessages.subscriberHeader(user.firstName),
        subscriberMenu
      )
})

subscriberScene.hears(
  subscriberMessages.SUBSCRIBER_GET_SUBSCRIPTION_INFO,
  async (ctx) => {
    await ctx.replyWithChatAction("typing")

    const adminInfo = await getAdminInfo()
    const priceInPaymentCurrencyPerMember = await getPaymentPrice(
      env.SUBSCRIPTION_PRICE_PER_MEMBER
    )

    return ctx.replyWithMarkdown(
      subscriberMessages.subscriptionInfo(
        adminInfo,
        priceInPaymentCurrencyPerMember
      )
    )
  }
)

subscriberScene.hears(
  subscriberMessages.SUBSCRIBER_GET_PAYMENT_INFO,
  async (ctx) => {
    await ctx.replyWithChatAction("typing")

    const tId = ctx.from?.id

    if (tId === undefined) {
      throw new DataError("Current user id is missing")
    }

    const paymentInfo = await getPaymentInfoForSubscriber(tId)

    return ctx.replyWithMarkdown(subscriberMessages.paymentStatus(paymentInfo))
  }
)

export default subscriberScene
