import path from "path"
import {
  Stage,
  SceneContextMessageUpdate,
  Middleware,
  ContextMessageUpdate
} from "telegraf"
import TelegrafI18n from "telegraf-i18n"
import RedisSession from "telegraf-session-redis"

import { scenes } from "../scenes"
import { Bot } from "../types"
import logger from "../config/logger"

// let session: RedisSession
// let i18n: TelegrafI18n

function configureSession(): RedisSession {
  return new RedisSession({
    store: {
      host: process.env.TELEGRAM_SESSION_HOST ?? "127.0.0.1",
      port: process.env.TELEGRAM_SESSION_PORT ?? 6379
    }
  })
}

function configureStage(): Stage<SceneContextMessageUpdate> {
  logger.debug("here")
  const stage = new Stage(scenes)

  stage.command("cancel", () => Stage.leave())

  return stage
}

function configureI18n(): TelegrafI18n {
  return new TelegrafI18n({
    defaultLanguage: "en",
    defaultLanguageOnMissing: true,
    directory: path.resolve(__dirname, "i18n"),
    useSession: true
    // templateData: {
    // pluralize: I18n.pluralize,
    // uppercase: (value) => value.toUpperCase()
    // }
  })

  // logger.debug(i18n)
  // return i18n
}

export const session = configureSession()
export const i18n = configureI18n()
export const stage = configureStage()

function configureMiddlewares(bot: Bot): void {
  bot.use(session.middleware())
  bot.use(i18n.middleware())
  bot.use(stage.middleware() as Middleware<ContextMessageUpdate>)
}

export default configureMiddlewares
