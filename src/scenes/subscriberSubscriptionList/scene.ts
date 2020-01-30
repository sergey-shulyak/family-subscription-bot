import { BaseScene, Stage } from "telegraf"
import { Scene } from "../sceneEnum"
import { Subscription } from "../../models/subscription"
import { subscriptionListMenu, subscriptionMenu } from "./menus"
import messages from "../../messages/ru/subscriptionListMessages"
import { User } from "../../models/user"
import logger from "../../config/logger"

// TODO: Refactor the mess here

interface SubscriptionListSceneState {
  subscriptions: Subscription[]
  selectedSubscriptionId: string | null
}

const subscriptionListScene = new BaseScene(Scene.SubscriberSubscriptionList)

subscriptionListScene.enter(async (ctx) => {
  ctx.scene.state = {
    subscriptions: [],
    selectedSubscriptionId: null
  }

  const state = ctx.scene.state as SubscriptionListSceneState

  if (ctx.from === undefined) {
    logger.error("Unable to get current user id")
    return
  }

  const user = await User.findByTelegramId(ctx.from?.id)

  if (user === null || user.id === undefined) {
    logger.error("No existing user current user id")
    return
  }

  const subscriptions = await Subscription.findAllBySubscriberId(user.id)
  state.subscriptions = subscriptions

  subscriptions.forEach((subscription) => {
    subscriptionListScene.hears(new RegExp(subscription.title), async (ctx) => {
      if (subscription.id === undefined) {
        logger.error("No subscription id is present in item handler")
        return
      }

      const state = ctx.scene.state as SubscriptionListSceneState

      state.selectedSubscriptionId = subscription.id

      return ctx.replyWithHTML(
        messages.subscriptionDescription(subscription),
        subscriptionMenu(subscription)
      )
    })
  })

  await ctx.reply("Ваши подписки")
  await Promise.all([
    subscriptions.map(async (subscription, index) =>
      ctx.reply(
        `${index + 1}. ${subscription.title} (${
          subscription.id?.split("-")[0]
        })`
      )
    )
  ])

  return ctx.reply(
    messages.SELECT_SUB_TO_VIEW_DETAILS,
    subscriptionListMenu(subscriptions)
  )
})

subscriptionListScene.hears(messages.INFO, async (ctx) => {
  const state = ctx.scene.state as SubscriptionListSceneState
  const currentSubscription = state.subscriptions.find(
    (sub) => sub.id === state.selectedSubscriptionId
  )

  if (currentSubscription === undefined) {
    logger.error("No subscription present in scene state")
    return
  }

  return ctx.replyWithHTML(
    messages.subscriptionDescription(currentSubscription),
    subscriptionMenu(currentSubscription)
  )
})

subscriptionListScene.hears(messages.BACK, Stage.enter(Scene.Subscriber))

export default subscriptionListScene
