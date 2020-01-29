import { BaseScene, Stage } from "telegraf"
import { editSubscriptionMenu } from "./menus"
import { Scene } from "../sceneEnum"
import { User } from "../../models/user"
import { Subscription } from "../../models/subscription"
import { validate } from "class-validator"
import { constantCase } from "change-case"
import logger from "../../config/logger"
import moment from "moment"

// // TODO: Refactor the mess here

// interface EditSubscriptionSceneState {
//   isEdit: boolean
//   subscription: Subscription
//   user: User
//   field: string | null
// }

// const propertiesRegexps = {
//   title: new RegExp(editSubscriptionMessages.SUBSCRIPTION_TITLE),
//   price: new RegExp(editSubscriptionMessages.SUBSCRIPTION_PRICE),
//   pricePerMember: new RegExp(
//     editSubscriptionMessages.SUBSCRIPTION_PRICE_PER_MEMBER
//   ),
//   currency: new RegExp(editSubscriptionMessages.SUBSCRIPTION_CURRENCY),
//   billingDate: new RegExp(editSubscriptionMessages.SUBSCRIPTION_BILLING_DATE),
//   ownerCard: new RegExp(editSubscriptionMessages.SUBSCRIPTION_OWNER_CARD)
// }

const editSubscriptionScene = new BaseScene(Scene.EditSubscription)

// editSubscriptionScene.enter(async (ctx) => {
//   ctx.scene.state = {
//     isEdit: false,
//     field: null,
//     subscription: {
//       title: "",
//       ownerId: null,
//       ownerCard: "",
//       billingDate: null,
//       price: 0,
//       pricePerMember: 0,
//       currency: "usd"
//     }
//   }

//   const state = ctx.scene.state as EditSubscriptionSceneState

//   return ctx.reply(
//     state.isEdit
//       ? editSubscriptionMessages.SUBSCRIPTION_EDIT
//       : editSubscriptionMessages.SUBSCRIPTION_ADD,
//     editSubscriptionMenu(state.subscription)
//   )
// })

// editSubscriptionScene.hears(
//   editSubscriptionMessages.SUBSCRIPTION_ADD,
//   async (ctx) => {
//     const subscription: Subscription = (ctx.scene.state as any).subscription

//     return ctx.reply(
//       editSubscriptionMessages.SUBSCRIPTION_ADD,
//       editSubscriptionMenu(subscription)
//     )
//   }
// )

// // Assign handlers for property changes
// Object.entries(propertiesRegexps).forEach(([property, regexp]) => {
//   editSubscriptionScene.hears(regexp, async (ctx) => {
//     ctx.scene.state = {
//       ...ctx.scene.state,
//       field: property
//     }

//     // TODO: Add currency inline menu?
//     // if (property === "currency") {
//     //   return ctx.reply(
//     //     `SUBSCRIPTION_${constantCase(property)}_RESPONSE`,
//     //     editSubscriptionMenu(state.subscription)
//     //   )
//     // }

//     return ctx.reply(
//       (editSubscriptionMessages as { [key: string]: string })[
//         `SUBSCRIPTION_${constantCase(property)}_RESPONSE`
//       ]
//     )
//   })
// })

// editSubscriptionScene.hears(
//   editSubscriptionMessages.SUBSCRIPTION_SAVE,
//   async (ctx) => {
//     const state = ctx.scene.state as EditSubscriptionSceneState

//     const subscriptionProps = {
//       ...state.subscription,
//       billingDate: moment(
//         state.subscription.billingDate,
//         "DD.MM.YYYY"
//       ).toDate(),
//       price: Number(state.subscription.price),
//       pricePerMember: Number(state.subscription.pricePerMember)
//     }

//     const subscription = new Subscription(subscriptionProps)

//     await validate(subscription)

//     if (ctx.from?.id === undefined) {
//       return
//     }

//     const subscriptionOwner = await User.findByTelegramId(ctx.from?.id)

//     if (subscriptionOwner === null) {
//       return
//     }

//     subscription.ownerId = subscriptionOwner.id as string

//     const entity = new Subscription(subscription)
//     await Subscription.create(entity)

//     await ctx.reply(editSubscriptionMessages.SUBSCRIPTION_SAVE_RESPONSE)

//     return ctx.scene.enter(Scene.Owner)
//   }
// )

// editSubscriptionScene.hears(
//   editSubscriptionMessages.SUBSCRIPTION_CANCEL,
//   Stage.enter(Scene.Owner)
// )

// editSubscriptionScene.on("text", async (ctx, next) => {
//   const state = ctx.scene.state as EditSubscriptionSceneState

//   logger.debug("next", next?.toString())

//   if (state.field === null && next !== undefined) {
//     await next()
//     return
//   }

//   if (state.field === null) {
//     return
//   }

//   state.subscription[state.field] = ctx.message?.text
//   state.field = null

//   return ctx.reply(
//     editSubscriptionMessages.SUBSCRIPTION_PROPERTY_CHANGED,
//     editSubscriptionMenu(state.subscription)
//   )
// })

export default editSubscriptionScene
