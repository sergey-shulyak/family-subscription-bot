import { Middleware, SceneContextMessageUpdate, Stage } from "telegraf"

const commands: Map<string, Middleware<SceneContextMessageUpdate>> = new Map([
  // Navigation commands
  ["greeter", Stage.enter("greeter")]

  // Bot commands
])

export default commands
