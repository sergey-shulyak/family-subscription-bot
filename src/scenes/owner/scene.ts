import { BaseScene } from "telegraf"
import { Scene } from "../sceneEnum"
import { getAdminInfo, getSubscribers } from "../../services/userService"
import ownerMessages from "../../messages/ru/ownerMessages"
import { ownerMenu } from "./menus"
import {
  getDebtors,
  nextBillingDate,
  getPaymentPrice
} from "../../services/paymentService"
import env from "../../config/env"
import isEmpty = require("lodash/isEmpty")

const ownerScene = new BaseScene(Scene.Owner)

ownerScene.enter(async (ctx) => {
  const { firstName: adminName } = await getAdminInfo()
  return ctx.replyWithMarkdown(ownerMessages.ownerHeader(adminName), ownerMenu)
})

ownerScene.hears(ownerMessages.OWNER_DEBTORS, async (ctx) => {
  const debtors = await getDebtors()

  const isDebtorsPresent = !isEmpty(debtors)

  return ctx.replyWithMarkdown(
    isDebtorsPresent
      ? ownerMessages.subscriberList(debtors)
      : ownerMessages.OWNER_NO_DEBTORS
  )
})

ownerScene.hears(ownerMessages.OWNER_SUBSCRIBER_LIST, async (ctx) => {
  const subscribers = await getSubscribers()

  const isSubscribersPresent = !isEmpty(subscribers)

  return ctx.replyWithMarkdown(
    isSubscribersPresent
      ? ownerMessages.subscriberList(subscribers)
      : ownerMessages.OWNER_NO_SUBSCRIBERS
  )
})

ownerScene.hears(ownerMessages.OWNER_GET_SUBSCRIPTION_INFO, async (ctx) => {
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

export default ownerScene
