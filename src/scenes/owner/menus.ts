import { Markup } from "telegraf"
import ownerMessages from "../../messages/ru/ownerMessages"

export const ownerMenu = Markup.keyboard([
  [ownerMessages.OWNER_ADD_SUBSCRIPTION],
  [ownerMessages.OWNER_SUBSCRIPTION_LIST],
  [ownerMessages.OWNER_LOGOUT, ownerMessages.OWNER_SETTINGS]
])
  .resize()
  .extra()
