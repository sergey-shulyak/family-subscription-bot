import Telegraf from "telegraf"

import logger from "./config/logger"
import env from "./config/env"
import { Bot } from "./types"
import { configureCommands } from "./commands"
import { helpMessage } from "./messages/ru/help"

function createAndConfigureBot(): Bot {
  const bot = new Telegraf(env.TELEGRAM_BOT_API_TOKEN, {
    username: env.BOT_NAME
  })

  bot.start(async (ctx) => ctx.reply("Hello"))
  bot.help(async (ctx) => ctx.reply(helpMessage))

  configureCommands(bot)

  bot.catch((err: Error) => logger.error(err, "Encountered an error"))

  return bot
}

export async function start(): Promise<void> {
  await createAndConfigureBot().launch()
}
