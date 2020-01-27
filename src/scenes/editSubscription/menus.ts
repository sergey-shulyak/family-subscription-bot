import { Markup } from "telegraf"
import { Subscription } from "../../models/subscription"
import editSubscriptionMessages from "../../messages/ru/editSubscriptionMessages"

export const editSubscriptionMenu = (state: Subscription): object =>
  Markup.keyboard([
    [`${editSubscriptionMessages.SUBSCRIPTION_TITLE}: ${state.title ?? "-"}`],
    [`${editSubscriptionMessages.SUBSCRIPTION_PRICE}: ${state.price ?? "-"}`],
    [
      `${
        editSubscriptionMessages.SUBSCRIPTION_PRICE_PER_MEMBER
      }: ${state.pricePerMember ?? "-"}`
    ],
    [
      `${editSubscriptionMessages.SUBSCRIPTION_CURRENCY}: ${state.currency ??
        "-"}`
    ],
    [
      `${
        editSubscriptionMessages.SUBSCRIPTION_BILLING_DATE
      }: ${state.billingDate ?? "-"}`
    ],
    [
      `${editSubscriptionMessages.SUBSCRIPTION_OWNER_CARD}: ${state.ownerCard ??
        "-"}`
    ],
    [
      editSubscriptionMessages.SUBSCRIPTION_CANCEL,
      editSubscriptionMessages.SUBSCRIPTION_SAVE
    ]
  ])
    .resize()
    .extra()
