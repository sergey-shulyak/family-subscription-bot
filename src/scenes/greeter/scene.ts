import { BaseScene, Stage } from "telegraf"
import { greeterMenu } from "./menus"
import greeterMessages from "../../messages/ru/greeterMessages"
import { Scene } from "../sceneEnum"

const greeterScene = new BaseScene(Scene.Greeter)

greeterScene.enter(async (ctx) =>
  ctx.reply(greeterMessages.GREETING_HEADER, greeterMenu)
)

greeterScene.hears(
  greeterMessages.GREETING_ROLE_OWNER,
  Stage.enter(Scene.Owner)
)

greeterScene.hears(
  greeterMessages.GREETING_ROLE_SUBSCRIBER,
  Stage.enter(Scene.Subscriber)
)

export default greeterScene
