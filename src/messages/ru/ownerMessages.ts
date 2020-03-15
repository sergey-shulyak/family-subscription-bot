import env from "../../config/env"
import currencyMap from "../../common/currencyMap"
import { User } from "../../models/user"

const usernameMapper = (user: User): string => {
  let result = user.firstName

  if (user.lastName !== undefined) {
    result += user.lastName
  }

  if (user.username !== undefined) {
    result += `@${user.username}`
  }

  return result
}

export default {
  ownerHeader: (firstName: string) => `Добро пожаловать, ${firstName}`,
  OWNER_GET_SUBSCRIPTION_INFO: "Информация о подписке ℹ️",

  subscriptionInfo: (
    adminInfo: User,
    nextBillingDate: string,
    priceInPaymentCurrency: number
  ) => `
*Подписка*: ${env.SUBSCRIPTION_TITLE}
*Стоимость*: ${env.SUBSCRIPTION_PRICE} ${
    currencyMap[env.SUBSCRIPTION_CURRENCY]
  } (${priceInPaymentCurrency} ${currencyMap[env.PAYMENT_CURRENCY]})
*Стоимость с человека*: ${env.SUBSCRIPTION_PRICE_PER_MEMBER} ${
    currencyMap[env.SUBSCRIPTION_CURRENCY]
  } (${priceInPaymentCurrency} ${currencyMap[env.PAYMENT_CURRENCY]})
*Дата следующей оплаты*: ${nextBillingDate}
*Администратор подписки*: ${adminInfo.firstName} ${adminInfo.lastName} (@${
    adminInfo.username
  })
`,
  OWNER_SUBSCRIBER_LIST: `Подписчики 👨‍👩‍👦`,
  OWNER_NO_SUBSCRIBERS: "Подписчиков нет 🤷‍♂️",
  OWNER_DEBTORS: `Должники 👮‍♂️`,
  OWNER_NO_DEBTORS: "Должников нет 👍",

  subscriberList: (subscribers: User[]) =>
    subscribers.map(usernameMapper).join("\n\n")
}
