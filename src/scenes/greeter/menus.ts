import { Markup } from "telegraf"
import greeterMessages from "../../messages/ru/greeterMessages"

export const greeterMenu = Markup.inlineKeyboard([
  Markup.callbackButton(greeterMessages.GREETING_ROLE_USER, "set_role_user"),
  Markup.callbackButton(greeterMessages.GREETING_ROLE_OWNER, "set_role_owner")
])
