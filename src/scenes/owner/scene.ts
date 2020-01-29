import { BaseScene, Stage } from "telegraf"
import { ownerMenu } from "./menus"
import { Scene } from "../sceneEnum"
import { User } from "../../models/user"
import ownerMessages from "../../messages/ru/ownerMessages"

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

  return ctx.reply(ownerMessages.OWNER_HEADER, ownerMenu)
})

ownerScene.hears(
  ownerMessages.OWNER_ADD_SUBSCRIPTION,
  Stage.enter(Scene.EditSubscription)
)

ownerScene.hears(
  ownerMessages.OWNER_SUBSCRIPTION_LIST,
  Stage.enter(Scene.SubscriptionList)
)

ownerScene.hears(ownerMessages.OWNER_LOGOUT, Stage.enter(Scene.Greeter))

export default ownerScene
