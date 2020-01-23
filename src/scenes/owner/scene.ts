import { BaseScene, Extra } from "telegraf"
import { ownerMenu } from "./menus"
import { Scene } from "../sceneEnum"
import userMessages from "../../messages/ru/ownerMessages"
import { User } from "../../models/user"

const ownerScene = new BaseScene(Scene.Owner)

ownerScene.enter(async (ctx) => {
  // Check if owner have registered subscriptions
  // if yes - show main menu
  // if no - show add new subscription

  if (ctx.from?.id !== undefined) {
    const user = ctx.from

    const existingUser = await User.findByTelegramId(user.id)

    if (existingUser === null) {
      await User.create({
        telegramId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username
      })
    }

    ctx.scene.state = {
      user:
        existingUser !== undefined
          ? existingUser
          : await User.findByTelegramId(user.id)
    }
  }

  return ctx.reply(userMessages.OWNER_HEADER, ownerMenu)
})

export default ownerScene
