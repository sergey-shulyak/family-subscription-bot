import Telegraf, { SceneContextMessageUpdate } from "telegraf"

import logger from "./config/logger"
import env from "./config/env"
import { Bot } from "./types"
import { configureCommands } from "./commands"
import { helpMessage } from "./messages/ru/help"
import configureMiddlewares from "./middlewares"
import { Scene } from "./scenes/sceneEnum"
import { pool } from "./db"

export let bot: Bot

function createAndConfigureBot(): Bot {
  bot = new Telegraf(env.TELEGRAM_BOT_API_TOKEN)

  configureMiddlewares(bot)

  bot.start(async (ctx) => {
    return (ctx as SceneContextMessageUpdate).scene.enter(Scene.Greeter)
  })

  bot.help(async (ctx) => ctx.reply(helpMessage))

  configureCommands(bot)

  bot.catch((err: Error) => logger.error(err, "Encountered an error"))

  return bot
}

export async function start(): Promise<void> {
  await pool.connect()

  const bot = createAndConfigureBot()
  await bot.launch()
}
