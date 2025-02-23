import env from "../../config/env"
import { User } from "../../models/user"
import { createFormatter } from "../../common/currencyFormatter"
import { formatCardNumber } from "../../helpers/creditCardUtils"

const subscriptionFormatter = createFormatter(env.SUBSCRIPTION_CURRENCY)
const paymentFormatter = createFormatter(env.PAYMENT_CURRENCY)

const usernameMapper = (user: User): string => {
  let result = `- ${user.firstName}`

  if (user.lastName !== undefined && user.lastName !== null) {
    result += ` ${user.lastName}`
  }

  if (user.username !== undefined && user.username !== null) {
    result += ` (@${user.username})`
  }

  return result
}

export default {
  ownerHeader: (firstName: string) =>
    `*Привет, ${firstName}*
Ты вошел как *администратор* 👨‍✈️`,
  OWNER_GET_SUBSCRIPTION_INFO: "Информация о подписке ℹ️",

  subscriptionInfo: (
    adminInfo: User,
    nextBillingDate: string,
    priceInPaymentCurrency: number,
    priceInPaymentCurrencyPerMember: number,
    cardNumber: string
  ) => `
📜 *Подписка*: ${env.SUBSCRIPTION_TITLE}
💵 *Стоимость*: ${subscriptionFormatter.format(
    env.SUBSCRIPTION_PRICE
  )} (${paymentFormatter.format(priceInPaymentCurrency)})
👨‍🌾 *Стоимость с человека*: ${subscriptionFormatter.format(
    env.SUBSCRIPTION_PRICE_PER_MEMBER
  )} (${paymentFormatter.format(priceInPaymentCurrencyPerMember)})
📆 *Дата следующей оплаты*: ${nextBillingDate}
💳 *Карта*: ${formatCardNumber(cardNumber)}
👨‍✈️ *Администратор подписки*: ${adminInfo.firstName} ${adminInfo.lastName} (@${
    adminInfo.username
  })
`,
  OWNER_SUBSCRIBER_LIST: `Подписчики 👨‍👩‍👦`,
  OWNER_NO_SUBSCRIBERS: "Подписчиков нет 🤷‍♂️",
  OWNER_DEBTORS: `Должники 👮‍♂️`,
  OWNER_NO_DEBTORS: "Должников нет 👍",
  OWNER_SEND_REMINDER: "Запросить оплату 💰",
  OWNER_SEND_REMINDER_DONE: "Уведомление отправлено ✅",

  subscriberList: (subscribers: User[]) =>
    subscribers.map(usernameMapper).join("\n")
}
