import { SceneContextMessageUpdate } from "telegraf"
// import R from "ramda"

// import logger from "../../config/logger"
// import toJson from "../../helpers/toJson"
import { Scene } from "../sceneEnum"
import { Role } from "../../common/roleEnum"
import logger from "../../config/logger"

const roleToScene = new Map<Role, Scene>([[Role.Owner, Scene.Owner]])

function validateRole(role?: Role): Role {
  const validRoles = Object.values(Role)

  if (role === undefined || !validRoles.includes(role)) {
    throw new Error("Invalid role")
  }

  return role
}

export default async function setRole(
  ctx: SceneContextMessageUpdate
): Promise<void> {
  const currentRole = ctx.callbackQuery?.data?.split("_")[2] as Role

  const validRole = validateRole(currentRole)

  logger.info(`User ${ctx.chat?.username} logged in as ${validRole}`)

  // @ts-ignore
  // ctx.s.role = validRole

  ctx.scene.state = { x: "" }

  await ctx.scene.enter(roleToScene.get(validRole) as Scene)
}
