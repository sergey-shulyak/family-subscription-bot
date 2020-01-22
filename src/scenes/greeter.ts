import { BaseScene, Extra } from "telegraf"
import { greeterMenu } from "../menus/greeterMenu"
import greeterMessages from "../messages/ru/greeterMessages"
import { Command } from "../commands/commandEnum"
import setRole from "../commands/setRole"
import { Scene } from "./sceneEnum"

const greeter = new BaseScene(Scene.Greeter)

greeter.enter(async (ctx) =>
  ctx.reply(greeterMessages.GREETING_HEADER, Extra.markup(greeterMenu))
)

greeter.command(Command.SetRole, setRole)
greeter.action("set_role", setRole)

// greeter.leave(async (ctx) => ctx.reply("Bye"))
// greeter.hears(/hi/gi, Stage.leave())
// greeter.on("message", async (ctx) => ctx.reply("Send `hi`"))

export default greeter
