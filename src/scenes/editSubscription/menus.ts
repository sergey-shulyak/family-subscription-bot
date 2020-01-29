import { Markup, SceneContextMessageUpdate } from "telegraf"
import { Subscription } from "../../models/subscription"

export const editSubscriptionMenu = (
  ctx: SceneContextMessageUpdate,
  state: Subscription
): object =>
  Markup.keyboard([
    [`${ctx.i18n.t("SUBSCRIPTION.TITLE")}: ${state.title ?? "-"}`],
    [`${ctx.i18n.t("SUBSCRIPTION.PRICE")}: ${state.price ?? "-"}`],
    [
      `${ctx.i18n.t("SUBSCRIPTION.PRICE_PER_MEMBER")}: ${state.pricePerMember ??
        "-"}`
    ],
    [`${ctx.i18n.t("SUBSCRIPTION.CURRENCY")}: ${state.currency ?? "-"}`],
    [`${ctx.i18n.t("SUBSCRIPTION.BILLING_DATE")}: ${state.billingDate ?? "-"}`],
    [`${ctx.i18n.t("SUBSCRIPTION.OWNER_CARD")}: ${state.ownerCard ?? "-"}`],
    [ctx.i18n.t("SUBSCRIPTION.CANCEL"), ctx.i18n.t("SUBSCRIPTION.SAVE")]
  ])
    .resize()
    .extra()
