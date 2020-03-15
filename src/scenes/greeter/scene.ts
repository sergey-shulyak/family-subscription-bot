import { BaseScene } from "telegraf"
import { greeterMenu } from "./menus"
import greeterMessages from "../../messages/ru/greeterMessages"
import { Scene } from "../sceneEnum"
import { UserService } from "../../services/userService"
import { DataError } from "../../errors/customErrors"
import env from "../../config/env"

const greeterScene = new BaseScene(Scene.Greeter)

greeterScene.enter(async (ctx) => {
  return ctx.replyWithMarkdown(greeterMessages.GREETING_HEADER, greeterMenu)
})

greeterScene.hears(greeterMessages.GREETING_SEND_ID, async (ctx) => {
  const userData = ctx.from

  if (userData === undefined) {
    throw new DataError(
      "Unable to save user data, received empty data from context"
    )
  }

  try {
    await UserService.saveUser(userData)
  } catch (err) {
    return ctx.reply(greeterMessages.GREETING_REGISTRATION_ERROR, greeterMenu)
  }

  await ctx.reply(greeterMessages.GREETING_REGISTRATION_SUCCESS)

  return userData.id === env.SUBSCRIPTION_OWNER_ID
    ? ctx.scene.enter(Scene.Owner)
    : ctx.scene.enter(Scene.Subscriber)
})

export default greeterScene
