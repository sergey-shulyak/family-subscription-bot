import { BaseScene } from "telegraf"
import { Scene } from "../sceneEnum"
import { UserService } from "../../services/userService"
import { PaymentService } from "../../services/paymentService"
import ownerMessages from "../../messages/ru/ownerMessages"
import { ownerMenu } from "./menus"
import isEmpty = require("lodash/isEmpty")

const ownerScene = new BaseScene(Scene.Subscriber)

ownerScene.enter(async (ctx) => {
  const { firstName: adminName } = await UserService.getAdminInfo()
  return ctx.replyWithMarkdown(ownerMessages.ownerHeader(adminName), ownerMenu)
})

ownerScene.hears(ownerMessages.OWNER_DEBTORS, async (ctx) => {
  const debtors = await PaymentService.getDebtors()

  const isDebtorsPresent = !isEmpty(debtors)

  return ctx.replyWithMarkdown(
    isDebtorsPresent
      ? ownerMessages.subscriberList(debtors)
      : ownerMessages.OWNER_NO_DEBTORS
  )
})

ownerScene.hears(ownerMessages.OWNER_SUBSCRIBER_LIST, async (ctx) => {
  const subscribers = await UserService.getSubscribers()

  const isSubscribersPresent = !isEmpty(subscribers)

  return ctx.replyWithMarkdown(
    isSubscribersPresent
      ? ownerMessages.subscriberList(subscribers)
      : ownerMessages.OWNER_NO_SUBSCRIBERS
  )
})

export default ownerScene
