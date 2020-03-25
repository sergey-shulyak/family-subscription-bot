import {
  Stage,
  SceneContextMessageUpdate,
  Middleware,
  ContextMessageUpdate
} from "telegraf"
import RedisSession from "telegraf-session-redis"

import scenes from "../scenes"
import { Bot } from "../types/bot"

export let session: RedisSession

function configureSession(): RedisSession {
  session = new RedisSession({
    store: {
      url: process.env.REDIS_URL
    } as any
  })

  return session
}

function configureStage(): Stage<SceneContextMessageUpdate> {
  const stage = new Stage(scenes)

  stage.command("cancel", () => Stage.leave())

  return stage
}

function configureMiddlewares(bot: Bot): void {
  bot.use(configureSession().middleware())
  bot.use(configureStage().middleware() as Middleware<ContextMessageUpdate>)
}

export default configureMiddlewares
