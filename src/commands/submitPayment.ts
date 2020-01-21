import { ContextMessageUpdate } from "telegraf"
import R from "ramda"

import logger from "../config/logger"
import { submitPaymentResponse } from "../messages/ru/submitPaymentResponse"
import { formatUsername } from "../helpers/formatUsername"

export default async function submitPayment(
  ctx: ContextMessageUpdate
): Promise<void> {
  const paymentDate = new Date()

  const username = !R.isEmpty(ctx.chat?.first_name)
    ? `${ctx.chat?.first_name} ${ctx.chat?.last_name}`
    : formatUsername(ctx.chat?.username)

  logger.info(
    `User ${username} submitted payment at ${paymentDate.toISOString()}`
  )

  await ctx.reply(submitPaymentResponse(new Date()))
}
