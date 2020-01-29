import { Markup } from "telegraf"
import { Subscription } from "../../models/subscription"
import messages from "../../messages/ru/subscriptionListMessages"

export const subscriptionListMenu = (subscriptions: Subscription[]): object =>
  Markup.keyboard([
    ...subscriptions.map(
      (subscription, index) => `${index + 1}. ${subscription.title}`
    ),
    messages.BACK
  ])
    .resize()
    .extra()

// export const subscriptionList = (subscriptions: Subscription[]) =>
export const subscriptionMenu = (subscription: Subscription): object =>
  Markup.keyboard([
    [messages.INFO, messages.EDIT],
    [messages.DEBTORS],
    [messages.BACK]
  ])
    .resize()
    .extra()
