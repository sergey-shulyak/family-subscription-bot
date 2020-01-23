import { BaseScene } from "telegraf"
import { editSubscriptionMenu } from "./menus"
import { Scene } from "../sceneEnum"
import { User } from "../../models/user"
import { Subscription } from "../../models/subscription"
import editSubscriptionMessages from "../../messages/ru/editSubscriptionMessages"

const editSubscriptionScene = new BaseScene(Scene.Owner)

editSubscriptionScene.enter(async (ctx) => {
  // Check if owner have registered subscriptions
  // if yes - show main menu
  // if no - show add new subscription

  // if (ctx.from?.id !== undefined) {
  // const user = ctx.from

  // const existingUser = await User.findByTelegramId(user.id)

  // ctx.scene.state = {
  //   user: existingUser
  // }
  // }
  const state = ctx.scene.state as {
    isEdit: boolean
    subscription: Subscription
  }

  return ctx.reply(
    state.isEdit
      ? editSubscriptionMessages.SUBSCRIPTION_EDIT
      : editSubscriptionMessages.SUBSCRIPTION_ADD,
    editSubscriptionMenu(state.subscription)
  )
})

editSubscriptionScene.hears(
  editSubscriptionMessages.SUBSCRIPTION_ADD,
  async (ctx) => {
    // Show flow with subscription data
    // Save subscription to DB
    // Return to main menu or to subscription menu

    const { id: currentUserId } = (ctx.scene.state as any).user as User

    ctx.scene.state = {
      ...ctx.scene.state,
      subscription: {
        title: "",
        ownerId: currentUserId,
        ownerCard: "",
        billingDate: null,
        price: 0,
        pricePerMember: 0,
        currency: "usd"
      }
    }

    const subscription: Subscription = (ctx.scene.state as any).subscription

    return ctx.reply(
      editSubscriptionMessages.SUBSCRIPTION_ADD,
      editSubscriptionMenu(subscription)
    )
  }
)

editSubscriptionScene.hears(
  editSubscriptionMessages.SUBSCRIPTION_TITLE,
  async (ctx) => ctx.reply(editSubscriptionMessages.SUBSCRIPTION_TITLE_RESPONSE)
)
// .hears(/.*/, async (ctx) => {
//   const subscription = (ctx.scene.state as any).subscription

//   ctx.scene.state = {
//     ...ctx.scene.state,
//     subscription: {
//       ...subscription,
//       title: ctx.message?.text
//     }
//   }

//   return ctx.reply(editSubscriptionMessages.SUBSCRIPTION_PROPERTY_CHANGED)
// })

export default editSubscriptionScene
