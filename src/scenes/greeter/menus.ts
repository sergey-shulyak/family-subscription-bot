import { Markup, SceneContextMessageUpdate } from "telegraf"

export const greeterMenu = (ctx: SceneContextMessageUpdate): object =>
  Markup.keyboard([
    ctx.i18n.t("GREETER.ROLE_USER"),
    ctx.i18n.t("GREETER.ROLE_OWNER")
  ])
    .oneTime()
    .resize()
    .extra()
