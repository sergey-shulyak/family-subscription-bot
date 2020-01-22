import { Middleware, SceneContextMessageUpdate } from "telegraf"
import submitPayment from "./submitPayment"
import setRole from "./setRole"
import { Command } from "./commandEnum"

const enterScene = (scene: string) => async (ctx: SceneContextMessageUpdate) =>
  ctx.scene.enter(scene)

const commands: Map<string, Middleware<SceneContextMessageUpdate>> = new Map([
  ["greeter", enterScene("greeter")],
  [Command.SetRole, setRole],
  ["submitPayment", submitPayment]
])

export default commands
