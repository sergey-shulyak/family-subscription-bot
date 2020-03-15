import env from "../../config/env"
import currencyMap from "../../common/currencyMap"
import { User } from "../../models/user"
import { SubscriberPaymentInfo } from "../../services/paymentService"
import moment = require("moment")

const usernameMapper = (user: User) => {
  let result = user.firstName

  if (user.lastName) {
    result += user.lastName
  }

  if (user.username) {
    result += `@${user.username}`
  }

  return result
}

export default {
  ownerHeader: (firstName: string) => `Добро пожаловать, ${firstName}`,
  OWNER_GET_SUBSCRIPTION_INFO: "Информация о подписке ℹ️",

  subscriptionInfo: (adminInfo: User, nextBillingDate: Date) => `
*Подписка*: ${env.SUBSCRIPTION_TITLE}
*Стоимость*: ${env.SUBSCRIPTION_PRICE} ${env.SUBSCRIPTION_CURRENCY}
*Стоимость с человека*: ${env.SUBSCRIPTION_PRICE_PER_MEMBER} ${
    currencyMap[env.SUBSCRIPTION_CURRENCY]
  }
*Дата следующей оплаты*: ${nextBillingDate}
*Администратор подписки*: ${adminInfo.firstName} ${adminInfo.lastName} (@${
    adminInfo.username
  })
`,
  OWNER_SUBSCRIBER_LIST: `Подписчики 👨‍👩‍👦`,
  OWNER_DEBTORS: `Должники 👮‍♂️`,
  OWNER_NO_SUBSCRIBERS: "Должников нет 👍",

  subscriberList: (subscribers: User[]) =>
    subscribers.map(usernameMapper).join("\n\n"),

  OWNER_NO_DEBTORS: "Подписчиков нет 🤷‍♂️"
}
