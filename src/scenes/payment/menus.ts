import { Markup } from "telegraf"
import paymentMessages from "../../messages/ru/paymentMessages"

export const confirmPaymentMenu = Markup.keyboard([
  paymentMessages.CONFIRM_PAYMENT
])
  .oneTime()
  .resize()
  .extra()
