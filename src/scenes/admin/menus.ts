import { Markup } from "telegraf"
import adminMessages from "../../messages/ru/adminMessages"

export const adminMenu = Markup.inlineKeyboard([
  Markup.callbackButton(
    adminMessages.ADMIN_ADD_SUBSCRIPTION,
    "add_subscription"
  )
])
