import { Markup } from "telegraf"
import messages from "../../messages/ru/subscriberMessages"

export const subscriberMenu = Markup.keyboard([
  [messages.ADD_SUBSCRIPTION],
  [messages.SUBSCRIPTION_LIST],
  [messages.LOGOUT]
])
  .resize()
  .oneTime()
  .extra()

export const addSubscriptionConfirmMenu = Markup.keyboard([
  [messages.CONFIRM],
  [messages.CANCEL]
])
  .resize()
  .oneTime()
  .extra()
