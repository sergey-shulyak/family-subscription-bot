import { Markup, SceneContextMessageUpdate } from "telegraf"
import { Subscription } from "../../models/subscription"

export const subscriptionListMenu = (
  ctx: SceneContextMessageUpdate,
  subscriptions: Subscription[]
): object =>
  Markup.keyboard([
    ...subscriptions.map(
      (subscription, index) => `${index + 1}. ${subscription.title}`
    ),
    ctx.i18n.t("SUBSCRIPTION_LIST.BACK")
  ])
    .resize()
    .extra()

// export const subscriptionList = (subscriptions: Subscription[]) =>
export const subscriptionMenu = (
  ctx: SceneContextMessageUpdate,
  subscription: Subscription
): object =>
  Markup.keyboard([
    [
      ctx.i18n.t("SUBSCRIPTION_LIST.INFO"),
      ctx.i18n.t("SUBSCRIPTION_LIST.EDIT")
    ],
    [ctx.i18n.t("SUBSCRIPTION_LIST.DEBTORS")],
    [ctx.i18n.t("SUBSCRIPTION_LIST.BACK")]
  ])
    .resize()
    .extra()
