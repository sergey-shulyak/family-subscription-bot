import {
  session,
  Stage,
  SceneContextMessageUpdate,
  Middleware,
  ContextMessageUpdate
} from "telegraf"

import { scenes } from "../scenes"
import { Bot } from "../types"

function configureStage(): Stage<SceneContextMessageUpdate> {
  const stage = new Stage(scenes)

  stage.command("cancel", () => Stage.leave())

  return stage
}

function configureMiddlewares(bot: Bot): void {
  bot.use(session())
  bot.use(configureStage().middleware() as Middleware<ContextMessageUpdate>)
}

export default configureMiddlewares
