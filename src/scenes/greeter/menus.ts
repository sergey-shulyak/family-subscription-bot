import { Markup } from "telegraf"
import greeterMessages from "../../messages/ru/greeterMessages"

export const greeterMenu = Markup.keyboard([
  Markup.contactRequestButton(greeterMessages.GREETING_SEND_ID)
])
  .oneTime()
  .resize()
  .extra()
