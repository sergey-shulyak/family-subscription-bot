import { BaseScene, Extra } from "telegraf"
import { ownerMenu } from "./menus"
import { Scene } from "../sceneEnum"
import userMessages from "../../messages/ru/ownerMessages"
import { Role } from "../../common/roleEnum"

const ownerScene = new BaseScene(Scene.Owner)

ownerScene.enter(async (ctx) => {
  // Check if owner have registered subscriptions
  // if yes - show main menu
  // if no - show add new subscription

  ctx.scene.state = {
    role: Role.Owner
  }

  return ctx.reply(userMessages.OWNER_HEADER, Extra.markup(ownerMenu))
})

// greeter.action(/set_role/, setRole)

export default ownerScene
