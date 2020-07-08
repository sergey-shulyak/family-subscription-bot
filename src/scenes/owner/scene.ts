import { BaseScene } from "telegraf"
import { Scene } from "../sceneEnum"
import {
  getAdminInfo,
  getSubscribers,
  getChatIdsForPayment
} from "../../services/userService"
import ownerMessages from "../../messages/ru/ownerMessages"
import { ownerMenu } from "./menus"
import {
  getDebtors,
  nextBillingDate,
  getPaymentPrice
} from "../../services/paymentService"
import env from "../../config/env"
import isEmpty from "lodash/isEmpty"
import { bot } from "../../bot"
import paymentMessages from "../../messages/ru/paymentMessages"
import { confirmPaymentMenu } from "../payment/menus"

const ownerScene = new BaseScene(Scene.Owner)

ownerScene.enter(async (ctx) => {
  await ctx.replyWithChatAction("typing")

  const { firstName: adminName } = await getAdminInfo()
  return ctx.replyWithMarkdown(ownerMessages.ownerHeader(adminName), ownerMenu)
})

ownerScene.hears(ownerMessages.OWNER_DEBTORS, async (ctx) => {
  await ctx.replyWithChatAction("typing")

  const debtors = await getDebtors()

  const isDebtorsPresent = !isEmpty(debtors)

  return ctx.reply(
    isDebtorsPresent
      ? ownerMessages.subscriberList(debtors)
      : ownerMessages.OWNER_NO_DEBTORS
  )
})

ownerScene.hears(ownerMessages.OWNER_SUBSCRIBER_LIST, async (ctx) => {
  await ctx.replyWithChatAction("typing")

  const subscribers = await getSubscribers()

  const isSubscribersPresent = !isEmpty(subscribers)

  return ctx.reply(
    isSubscribersPresent
      ? ownerMessages.subscriberList(subscribers)
      : ownerMessages.OWNER_NO_SUBSCRIBERS
  )
})

ownerScene.hears(ownerMessages.OWNER_GET_SUBSCRIPTION_INFO, async (ctx) => {
  await ctx.replyWithChatAction("typing")
  const adminInfo = await getAdminInfo()

  const [subscriptionPrice, pricePerMember] = await Promise.all([
    getPaymentPrice(env.SUBSCRIPTION_PRICE),
    getPaymentPrice(env.SUBSCRIPTION_PRICE_PER_MEMBER)
  ])

  return ctx.replyWithMarkdown(
    ownerMessages.subscriptionInfo(
      adminInfo,
      nextBillingDate().format("DD.MM"),
      subscriptionPrice,
      pricePerMember,
      env.SUBSCRIPTION_CARD_NUMBER
    )
  )
})

ownerScene.hears(ownerMessages.OWNER_SEND_REMINDER, async (ctx) => {
  await ctx.replyWithChatAction("typing")
  const paymentPrice = await getPaymentPrice(env.SUBSCRIPTION_PRICE_PER_MEMBER)

  const chatIds = await getChatIdsForPayment()

  await Promise.all(
    chatIds.map(async (cId) => bot.telegram.sendMessage(cId, "/payment"))
  )

  await Promise.all(
    chatIds.map(async (cId) => bot.telegram.sendChatAction(cId, "typing"))
  )

  return Promise.all(
    chatIds.map((cId: number) => [
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
  )
})

export default ownerScene
