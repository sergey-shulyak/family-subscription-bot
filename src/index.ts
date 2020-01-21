import Telegraf from "telegraf"

import env from "./config/env"
import logger from "./config/logger"

async function start(): Promise<void> {
  const bot = new Telegraf(env.TELEGRAM_BOT_API_TOKEN)

  bot.start(async (ctx) => ctx.reply("Hello"))

  await bot.launch()
}

start()
  .then(() => logger.info("Bot has started"))
  .catch((err: Error) => logger.error(err, "Failed to start the bot"))
