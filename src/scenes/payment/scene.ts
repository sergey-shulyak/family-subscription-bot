import { BaseScene } from "telegraf"
import { confirmPaymentMenu } from "./menus"
import { Scene } from "../sceneEnum"
import { getAdminInfo } from "../../services/userService"
import { submitPayment } from "../../services/paymentService"
import { DataError } from "../../errors/customErrors"
import logger from "../../config/logger"
import paymentMessages from "../../messages/ru/paymentMessages"

const subscriberScene = new BaseScene(Scene.Payment)

subscriberScene.hears(paymentMessages.CONFIRM_PAYMENT, async (ctx) => {
  await ctx.replyWithChatAction("typing")

  const tId = ctx.from?.id

  if (tId === undefined) {
    throw new DataError("Current user id is missing")
  }

  try {
    await submitPayment(tId)
  } catch (err) {
    logger.error(`Failed to submit payment for ${tId}`, err)

    const admin = await getAdminInfo()

    if (admin?.username === undefined) {
      throw new DataError("Admin username is missing!")
    }

    return ctx.reply(
      paymentMessages.confirmPaymentError(admin.username),
      confirmPaymentMenu
    )
  }

  await ctx.reply(paymentMessages.CONFIRM_PAYMENT_SUCCESS)

  return ctx.scene.enter(Scene.Subscriber)
})

export default subscriberScene
