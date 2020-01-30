import { BaseScene, Stage } from "telegraf"
import { subscriberMenu, addSubscriptionConfirmMenu } from "./menus"
import { Scene } from "../sceneEnum"
import { User } from "../../models/user"
import messages from "../../messages/ru/subscriberMessages"
import logger from "../../config/logger"
import { Subscription } from "../../models/subscription"

interface SubscriberSceneState {
  user: User | null
  subscription: Subscription | null
  isAddingSubscription: boolean
}

const subscriberScene = new BaseScene(Scene.Subscriber)

subscriberScene.enter(async (ctx) => {
  ctx.scene.state = {
    user: null,
    isAddingSubscription: false
  }

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

  return ctx.reply(messages.HEADER, subscriberMenu)
})

subscriberScene.hears(messages.ADD_SUBSCRIPTION, async (ctx) => {
  const state = ctx.scene.state as SubscriberSceneState
  state.isAddingSubscription = true

  return ctx.reply(messages.WRITE_SUBSCRIPTION_ID)
})

subscriberScene.on("text", async (ctx) => {
  const state = ctx.scene.state as SubscriberSceneState

  if (!state.isAddingSubscription) {
    return
  }

  const subscriptionId = ctx.message?.text

  if (subscriptionId === undefined) {
    logger.error("No id provided")
    return ctx.reply("No subscription id")
  }

  const subscription = await Subscription.findByPartialId(subscriptionId)
  state.subscription = subscription

  if (subscription === null) {
    return ctx.reply(messages.NO_SUBSCRIPTION_FOUND)
  }

  const owner = await User.findById(subscription.ownerId)

  return ctx.replyWithHTML(
    messages.subscriptionConfirmationInfo({
      subscriptionTitle: subscription.title,
      ownerUsername: owner?.username ?? `${owner?.firstName} ${owner?.lastName}`
    }),
    addSubscriptionConfirmMenu
  )
})

subscriberScene.hears(messages.CONFIRM, async (ctx) => {
  const state = ctx.scene.state as SubscriberSceneState

  if (state.subscription?.id === undefined) {
    logger.error("Subscription id to add new subscriber to is empty")
    return
  }

  if (state.user?.id === undefined) {
    logger.error("Current user id to subscribe is empty")
    return
  }

  await Subscription.addSubscriber(state.subscription?.id, state.user?.id)
  state.isAddingSubscription = false

  state.subscription = null

  return ctx.reply(messages.SUBSCRIPTION_SUBMITTED, subscriberMenu)
})

subscriberScene.hears(messages.CANCEL, async (ctx) => {
  const state = ctx.scene.state as SubscriberSceneState
  state.subscription = null

  return ctx.reply("", subscriberMenu)
})

subscriberScene.hears(
  messages.SUBSCRIPTION_LIST,
  Stage.enter(Scene.SubscriberSubscriptionList)
)

subscriberScene.hears(messages.LOGOUT, Stage.enter(Scene.Greeter))

export default subscriberScene
