import { ContextMessageUpdate } from "telegraf"
import R from "ramda"

import logger from "../config/logger"
import toJson from "../helpers/toJson"
import greeterMessages from "../messages/ru/greeterMessages"

export default async function setRole(
  ctx: ContextMessageUpdate
): Promise<void> {
  logger.debug(
    "CTX data: ",
    toJson(R.pickBy((v, k) => typeof v !== "function" && k !== "scene", ctx))
  )
  // const paymentDate = new Date()

  // const username = !R.isEmpty(ctx.chat?.first_name)
  //   ? `${ctx.chat?.first_name} ${ctx.chat?.last_name}`
  //   : formatUsername(ctx.chat?.username)

  // logger.info(
  //   `User ${username} submitted payment at ${paymentDate.toISOString()}`
  // )

  // await ctx.scene.enter(Scene.Greeter)

  const currentRole = "подписчик"
  await ctx.reply(greeterMessages.greetingRoleSet(currentRole))
}
