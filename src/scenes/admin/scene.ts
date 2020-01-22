import { BaseScene, Extra } from "telegraf"
import { adminMenu } from "./menus"
import { Scene } from "../sceneEnum"
import userMessages from "../../messages/ru/adminMessages"
import { Role } from "../../common/roleEnum"

const adminScene = new BaseScene(Scene.Admin)

adminScene.enter(async (ctx) => {
  // Check if admin have registered subscriptions
  // if yes - show main menu
  // if no - show add new subscription

  ctx.scene.state = {
    role: Role.Admin
  }

  return ctx.reply(userMessages.ADMIN_HEADER, Extra.markup(adminMenu))
})

// greeter.action(/set_role/, setRole)

export default adminScene
