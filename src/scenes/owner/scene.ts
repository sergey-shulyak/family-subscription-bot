import { BaseScene, Stage } from "telegraf"
import { ownerMenu } from "./menus"
import { Scene } from "../sceneEnum"
import { User } from "../../models/user"
import { i18n } from "../../middlewares"

const ownerScene = new BaseScene(Scene.Owner)

ownerScene.enter(async (ctx) => {
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

  return ctx.reply(ctx.i18n.t("OWNER.HEADER"), ownerMenu(ctx))
})

ownerScene.hears(
  i18n.t("OWNER.ADD_SUBSCRIPTION"),
  Stage.enter(Scene.EditSubscription)
)

ownerScene.hears(
  i18n.t("OWNER.SUBSCRIPTION_LIST"),
  Stage.enter(Scene.SubscriptionList)
)

ownerScene.hears(i18n.t("OWNER.LOGOUT"), Stage.enter(Scene.Greeter))

export default ownerScene
