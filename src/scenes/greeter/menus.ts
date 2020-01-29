import { Markup } from "telegraf"
import greeterMessages from "../../messages/ru/greeterMessages"

export const greeterMenu = Markup.keyboard([
  greeterMessages.GREETING_ROLE_SUBSCRIBER,
  greeterMessages.GREETING_ROLE_OWNER
])
  .oneTime()
  .resize()
  .extra()
