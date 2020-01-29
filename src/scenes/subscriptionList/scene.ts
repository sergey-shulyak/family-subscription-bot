import { BaseScene, Stage } from "telegraf"
import { Scene } from "../sceneEnum"
import { Subscription } from "../../models/subscription"
import { subscriptionListMenu, subscriptionMenu } from "./menus"
import { User } from "../../models/user"
import logger from "../../config/logger"
import currencyMap from "../../common/currencyMap"
import { i18n } from "../../middlewares"
import moment from "moment"

// TODO: Refactor the mess here

// const subscriptionDescription = (subscription: Subscription): string =>
//   `${subscription.title}
// 🗓 Дата оплаты: ${moment(subscription.billingDate).format("DD.MM")}
// 🏷 Ежемесячная стоимость: ${subscription.price}${
//     currencyMap[subscription.currency]
//   }
// 👩‍👩‍👧‍👦 Стоимость для участника: ${subscription.pricePerMember}${
//     currencyMap[subscription.currency]
//   }`

interface SubscriptionListSceneState {
  subscriptions: Subscription[]
  selectedSubscriptionId: string | null
}

const descriptionProps = (subscription: Subscription): object => ({
  ...subscription,
  billingDate: moment(subscription.billingDate).format("DD.MM"),
  currencySymbol: currencyMap[subscription.currency]
})

const subscriptionListScene = new BaseScene(Scene.SubscriptionList)

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

  const subscriptions = await Subscription.findAllByOwnerId(user.id)
  state.subscriptions = subscriptions

  subscriptions.forEach((subscription) => {
    subscriptionListScene.hears(new RegExp(subscription.title), async (ctx) => {
      if (subscription.id === undefined) {
        logger.error("No subscription id is present in item handler")
        return
      }

      const state = ctx.scene.state as SubscriptionListSceneState

      state.selectedSubscriptionId = subscription.id

      return ctx.reply(
        ctx.i18n.t(
          "SUBSCRIPTION_LIST.DESCRIPTION",
          descriptionProps(subscription)
        ),
        subscriptionMenu(ctx, subscription)
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
    ctx.i18n.t("SUBSCRIPTION_LIST.SELECT_SUB_TO_VIEW_DETAILS"),
    subscriptionListMenu(ctx, subscriptions)
  )
})

subscriptionListScene.hears(i18n.t("SUBSCRIPTION_LIST.INFO"), async (ctx) => {
  const state = ctx.scene.state as SubscriptionListSceneState
  const currentSubscription = state.subscriptions.find(
    (sub) => sub.id === state.selectedSubscriptionId
  )

  if (currentSubscription === undefined) {
    logger.error("No subscription present in scene state")
    return
  }

  return ctx.reply(
    ctx.i18n.t(
      "SUBSCRIPTION_LIST.DESCRIPTION",
      descriptionProps(currentSubscription)
    ),
    subscriptionMenu(ctx, currentSubscription)
  )
})

subscriptionListScene.hears(
  i18n.t("SUBSCRIPTION_LIST.BACK"),
  Stage.enter(Scene.Owner)
)

export default subscriptionListScene
