import env from "../../config/env"
import currencyMap from "../../common/currencyMap"
import { User } from "../../models/user"
import { SubscriberPaymentInfo } from "../../services/paymentService"
import moment = require("moment")

export default {
  SUBSCRIBER_HEADER: `Текущая подписка: *${env.SUBSCRIPTION_TITLE}*`,
  SUBSCRIBER_GET_SUBSCRIPTION_INFO: "Информация о подписке ℹ️",
  subscriptionInfo: (adminInfo: User) => `
*Подписка*: ${env.SUBSCRIPTION_TITLE}
*Стоимость с человека*: ${env.SUBSCRIPTION_PRICE_PER_MEMBER} ${
    currencyMap[env.SUBSCRIPTION_CURRENCY]
  }
*Администратор подписки*: ${adminInfo.firstName} ${adminInfo.lastName} (@${
    adminInfo.username
  })
`,
  SUBSCRIBER_GET_PAYMENT_INFO: `Статус оплаты 💵`,
  paymentStatus: (paymentInfo: SubscriberPaymentInfo) => `
*Статус*: ${paymentInfo.isPaid ? "Оплачено ✅" : "Не оплачено 🛑"}
${
  paymentInfo.isPaid
    ? `*Последняя оплата*: ${moment(paymentInfo.paidAt).format(
        "DD.MM.YYYY HH:MM"
      )}`
    : ""
}
`
}
