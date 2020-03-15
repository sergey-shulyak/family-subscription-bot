import { Markup } from "telegraf"
import ownerMessages from "../../messages/ru/ownerMessages"
// import subscriberMessages from "../../messages/ru/subscriberMessages"

export const ownerMenu = Markup.keyboard([
  ownerMessages.OWNER_DEBTORS,
  ownerMessages.OWNER_GET_SUBSCRIPTION_INFO,
  ownerMessages.OWNER_SUBSCRIBER_LIST
])
  .resize()
  .extra()
