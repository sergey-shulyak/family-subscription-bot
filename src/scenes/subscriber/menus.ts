import { Markup } from "telegraf"
import subscriberMessages from "../../messages/ru/subscriberMessages"

export const subscriberMenu = Markup.keyboard([
  subscriberMessages.SUBSCRIBER_GET_PAYMENT_INFO,
  subscriberMessages.SUBSCRIBER_GET_SUBSCRIPTION_INFO
])
  .resize()
  .extra()
