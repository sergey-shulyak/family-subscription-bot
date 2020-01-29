import { Markup, SceneContextMessageUpdate } from "telegraf"

export const ownerMenu = (ctx: SceneContextMessageUpdate): object =>
  Markup.keyboard([
    [ctx.i18n.t("OWNER.ADD_SUBSCRIPTION")],
    [ctx.i18n.t("OWNER.SUBSCRIPTION_LIST")],
    [ctx.i18n.t("OWNER.LOGOUT"), ctx.i18n.t("OWNER.SETTINGS")]
  ])
    .resize()
    .extra()
