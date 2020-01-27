import { BaseScene } from "telegraf"
import { editSubscriptionMenu } from "./menus"
import { Scene } from "../sceneEnum"
import { User } from "../../models/user"
import { Subscription } from "../../models/subscription"
import editSubscriptionMessages from "../../messages/ru/editSubscriptionMessages"
import { validate } from "class-validator"

// TODO: Refactor the mess here

interface EditSubscriptionSceneState {
  isEdit: boolean
  subscription: Subscription
  field: string | null
}

const propertiesRegexps = {
  title: new RegExp(editSubscriptionMessages.SUBSCRIPTION_TITLE),
  price: new RegExp(editSubscriptionMessages.SUBSCRIPTION_PRICE),
  pricePerMember: new RegExp(editSubscriptionMessages.SUBSCRIPTION_PER_MEMBER),
  currency: new RegExp(editSubscriptionMessages.SUBSCRIPTION_CURRENCY),
  billingDate: new RegExp(editSubscriptionMessages.SUBSCRIPTION_BILLING_DATE),
  ownerCard: new RegExp(editSubscriptionMessages.SUBSCRIPTION_CARD_NUMBER)
}

const editSubscriptionScene = new BaseScene(Scene.EditSubscription)

editSubscriptionScene.enter(async (ctx) => {
  const { id: currentUserId } = (ctx.scene.state as any).user as User

  ctx.scene.state = {
    isEdit: false,
    subscription: {
      title: "",
      ownerId: currentUserId,
      ownerCard: "",
      billingDate: null,
      price: 0,
      pricePerMember: 0,
      currency: "usd"
    },
    field: null
  }

  const state = ctx.scene.state as EditSubscriptionSceneState

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
    const subscription: Subscription = (ctx.scene.state as any).subscription

    return ctx.reply(
      editSubscriptionMessages.SUBSCRIPTION_ADD,
      editSubscriptionMenu(subscription)
    )
  }
)

// Assign handlers for property changes
Object.entries(propertiesRegexps).forEach(([property, regexp]) => {
  editSubscriptionScene.hears(regexp, async (ctx) => {
    ctx.scene.state = {
      ...ctx.scene.state,
      field: property
    }

    return ctx.reply(
      editSubscriptionMessages[
        `SUBSCRIPTION_${property.toUpperCase()}_RESPONSE`
      ]
    )
  })
})

editSubscriptionScene.on("text", async (ctx) => {
  const state = ctx.scene.state as EditSubscriptionSceneState

  if (state.field === null) return

  await ctx.reply(JSON.stringify(state, null, 2))
  await ctx.reply(JSON.stringify(ctx.message, null, 2))

  state.subscription[state.field] = ctx.message?.text
  state.field = null

  return ctx.reply(
    editSubscriptionMessages.SUBSCRIPTION_PROPERTY_CHANGED,
    editSubscriptionMenu(state.subscription)
  )
})

editSubscriptionScene.hears(
  editSubscriptionMessages.SUBSCRIPTION_SUBMIT,
  async (ctx) => {
    const subscription: Subscription = (ctx.scene
      .state as EditSubscriptionSceneState).subscription

    await validate(subscription)

    const entity = new Subscription(subscription)
    await Subscription.create(entity)
  }
)

export default editSubscriptionScene
