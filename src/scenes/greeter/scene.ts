import { BaseScene, Stage } from "telegraf"
import { greeterMenu } from "./menus"
import { Scene } from "../sceneEnum"
import { i18n } from "../../middlewares"

const greeterScene = new BaseScene(Scene.Greeter)

greeterScene.enter(async (ctx) =>
  ctx.reply(ctx.i18n.t("GREETER.HEADER"), greeterMenu(ctx))
)

greeterScene.hears(match("GREETER.ROLE_OWNER"), Stage.enter(Scene.Owner))

export default greeterScene
