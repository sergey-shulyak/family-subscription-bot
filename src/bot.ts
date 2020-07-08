import fs from "fs"
import Telegraf, { SceneContextMessageUpdate } from "telegraf"

import logger from "./config/logger"
import env from "./config/env"
import { Bot } from "./types/bot"
import { configureCommands } from "./commands"
import { helpMessage } from "./messages/ru/help"
import configureMiddlewares from "./middlewares"
import { Scene } from "./scenes/sceneEnum"
import { pool } from "./db"
import { startCronJobs } from "./cronJobs"

export let bot: Bot

const tlsOptions = {
  key: fs.readFileSync("server-key.pem"),
  cert: fs.readFileSync("server-cert.pem"),
  ca: [
    // This is necessary only if the client uses a self-signed certificate.
    fs.readFileSync("ca-cert.pem")
  ]
}

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
  startCronJobs()

  if (process.env.NODE_ENV !== "production") {
    await bot.launch()
  } else {
    await bot.telegram.setWebhook(
      `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/bot-${env.TELEGRAM_BOT_API_TOKEN}`
    )

    bot.startWebhook(
      `/bot-${env.TELEGRAM_BOT_API_TOKEN}`,
      tlsOptions,
      process.env.PORT as any
    )
  }
}
