import { BaseScene } from "telegraf"
import { ownerMenu } from "./menus"
import { Scene } from "../sceneEnum"
import { User } from "../../models/user"
import ownerMessages from "../../messages/ru/ownerMessages"
import { Subscription } from "../../models/subscription"

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

ownerScene.hears(ownerMessages.OWNER_ADD_SUBSCRIPTION, async (ctx) => {
  // Show flow with subscription data
  // Save subscription to DB
  // Return to main menu or to subscription menu

  const { id: currentUserId } = (ctx.scene.state as any).user as User

  ctx.scene.state = {
    ...ctx.scene.state,
    subscription: {
      title: "",
      ownerId: currentUserId,
      ownerCard: "",
      billingDate: null,
      price: 0,
      pricePerMember: 0,
      currency: "usd"
    }
  }

  const subscription: Subscription = (ctx.scene.state as any).subscription

  return ctx.scene.enter(Scene.EditSubscription, {
    isEdit: false,
    subscription
  })
})

export default ownerScene
