import { Markup } from "telegraf"
import greeterMessages from "../../messages/ru/greeterMessages"

export const greeterMenu = Markup.keyboard([
  greeterMessages.GREETING_ROLE_USER,
  greeterMessages.GREETING_ROLE_OWNER
])
  .oneTime()
  .resize()
  .extra()
