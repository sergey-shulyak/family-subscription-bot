import Telegraf, {
  SceneContextMessageUpdate,
  Context,
  ContextMessageUpdate
} from "telegraf"

import logger from "./config/logger"
import env from "./config/env"
import { Bot } from "./types/bot"
import { configureCommands } from "./commands"
import { helpMessage } from "./messages/ru/help"
import configureMiddlewares from "./middlewares"
import { Scene } from "./scenes/sceneEnum"
import { pool } from "./db"
import { startCronJobs } from "./cronJobs"
import paymentMessages from "./messages/ru/paymentMessages"

export let bot: Bot

function createAndConfigureBot(): Bot {
  bot = new Telegraf(env.TELEGRAM_BOT_API_TOKEN)

  configureMiddlewares(bot)

  bot.start(async (ctx) => {
    return (ctx as SceneContextMessageUpdate).scene.enter(Scene.Greeter)
  })

  bot.help(async (ctx) => ctx.reply(helpMessage))

  configureCommands(bot)

  bot.hears(paymentMessages.CONFIRM_PAYMENT, async (ctx) =>
    (ctx as SceneContextMessageUpdate).scene.enter(Scene.Payment)
  )

  bot.catch((err: Error) => logger.error(err, "Encountered an error"))

  return bot
}

export async function start(): Promise<void> {
  await pool.connect()

  const bot = createAndConfigureBot()
  startCronJobs()
  await bot.launch()
}
