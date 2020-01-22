import { Markup } from "telegraf"
import ownerMessages from "../../messages/ru/ownerMessages"

export const ownerMenu = Markup.inlineKeyboard([
  Markup.callbackButton(
    ownerMessages.OWNER_ADD_SUBSCRIPTION,
    "add_subscription"
  )
])
