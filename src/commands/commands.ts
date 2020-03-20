import { Middleware, SceneContextMessageUpdate, Stage } from "telegraf"
import { Scene } from "../scenes/sceneEnum"

const commands: Map<string, Middleware<SceneContextMessageUpdate>> = new Map([
  // Navigation commands
  ["payment", Stage.enter(Scene.Payment)]
])

export default commands
