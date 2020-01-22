import { BaseScene, Extra } from "telegraf"
import { greeterMenu } from "./menus"
import greeterMessages from "../../messages/ru/greeterMessages"
import setRole from "./actions"
import { Scene } from "../sceneEnum"

const greeterScene = new BaseScene(Scene.Greeter)

greeterScene.enter(async (ctx) =>
  ctx.reply(greeterMessages.GREETING_HEADER, Extra.markup(greeterMenu))
)

greeterScene.action(/set_role/, setRole)

export default greeterScene
