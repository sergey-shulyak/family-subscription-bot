import { BaseScene } from "telegraf"
import { greeterMenu } from "./menus"
import greeterMessages from "../../messages/ru/greeterMessages"
import { Scene } from "../sceneEnum"

const subscriberScene = new BaseScene(Scene.Subscriber)

subscriberScene.enter(async (ctx) => {
  return ctx.replyWithMarkdown(greeterMessages.GREETING_HEADER, greeterMenu)
})

subscriberScene.hears(greeterMessages.GREETING_SEND_ID, async (ctx) => {})

export default subscriberScene
