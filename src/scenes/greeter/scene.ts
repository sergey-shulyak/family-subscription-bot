import { BaseScene, SceneContextMessageUpdate } from "telegraf"
import { greeterMenu } from "./menus"
import greeterMessages from "../../messages/ru/greeterMessages"
import { Scene } from "../sceneEnum"
import { saveUser, isUserExists } from "../../services/userService"
import { DataError } from "../../errors/customErrors"
import env from "../../config/env"
import logger from "../../config/logger"

const greeterScene = new BaseScene(Scene.Greeter)

greeterScene.enter(async (ctx) => {
  return ctx.replyWithMarkdown(greeterMessages.GREETING_HEADER, greeterMenu)
})

async function getSceneForUser(
  tId: Number,
  ctx: SceneContextMessageUpdate
): Promise<Scene> {
  return tId === env.SUBSCRIPTION_OWNER_ID
    ? ctx.scene.enter(Scene.Owner)
    : ctx.scene.enter(Scene.Subscriber)
}

greeterScene.hears(greeterMessages.GREETING_SEND_ID, async (ctx) => {
  const userData = ctx.from

  if (userData === undefined) {
    throw new DataError(
      "Unable to save user data, received empty data from context"
    )
  }

  const userExists = await isUserExists(userData.id)

  if (userExists) {
    return getSceneForUser(userData.id, ctx)
  }

  if (ctx.chat?.id === undefined) {
    throw new DataError("Unable to retrieve chat id")
  }

  try {
    await saveUser(userData, ctx.chat.id)
  } catch (err) {
    logger.error("Failed to save user to database", err)
    return ctx.reply(greeterMessages.GREETING_REGISTRATION_ERROR, greeterMenu)
  }

  await ctx.reply(greeterMessages.GREETING_REGISTRATION_SUCCESS)

  return getSceneForUser(userData.id, ctx)
})

export default greeterScene
