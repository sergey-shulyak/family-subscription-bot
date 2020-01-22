import { Middleware, SceneContextMessageUpdate } from "telegraf"

const enterScene = (scene: string) => async (ctx: SceneContextMessageUpdate) =>
  ctx.scene.enter(scene)

const commands: Map<string, Middleware<SceneContextMessageUpdate>> = new Map([
  // Navigation commands
  ["greeter", enterScene("greeter")]

  // Bot commands
])

export default commands
