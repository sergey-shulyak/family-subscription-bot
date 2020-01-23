import { Markup } from "telegraf"
import { Subscription } from "../../models/subscription"
import editSubscriptionMessages from "../../messages/ru/editSubscriptionMessages"

export const editSubscriptionMenu = (state: Subscription): object =>
  Markup.keyboard([
    `${editSubscriptionMessages.SUBSCRIPTION_TITLE}: ${state.title ?? "empty"}`,
    `${editSubscriptionMessages.SUBSCRIPTION_PRICE}: ${state.price ?? "empty"}`,
    `${
      editSubscriptionMessages.SUBSCRIPTION_PER_MEMBER
    }: ${state.pricePerMember ?? "empty"}`,
    `${editSubscriptionMessages.SUBSCRIPTION_CURRENCY}: ${state.currency ??
      "empty"}`,
    `${
      editSubscriptionMessages.SUBSCRIPTION_BILLING_DATE
    }: ${state.billingDate ?? "empty"}`,
    `${editSubscriptionMessages.SUBSCRIPTION_CARD_NUMBER}: ${state.ownerCard ??
      "empty"}`
  ])
    .resize()
    .extra()
