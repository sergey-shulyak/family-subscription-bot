import env from "../../config/env"
import { User } from "../../models/user"
import { SubscriberPaymentInfo } from "../../services/paymentService"
import moment from "moment"
import { createFormatter } from "../../common/currencyFormatter"

const subscriptionFormatter = createFormatter(env.SUBSCRIPTION_CURRENCY)

export default {
  subscriberHeader: (firstName: string) => `
${firstName}, ты вошел как подписчик 🎧

📜 Текущая подписка: *${env.SUBSCRIPTION_TITLE}*
`,
  SUBSCRIBER_GET_SUBSCRIPTION_INFO: "Информация о подписке ℹ️",
  subscriptionInfo: (adminInfo: User) => `
📜 *Подписка*: ${env.SUBSCRIPTION_TITLE}
👨‍👩‍👦 *Стоимость с человека*: ${subscriptionFormatter.format(
    env.SUBSCRIPTION_PRICE_PER_MEMBER
  )}
👨‍✈️ *Администратор подписки*:
${adminInfo.firstName} ${adminInfo.lastName} (@${adminInfo.username})
`,
  SUBSCRIBER_GET_PAYMENT_INFO: `Статус оплаты 💵`,
  paymentStatus: (paymentInfo: SubscriberPaymentInfo) => `
*Статус*: ${paymentInfo.isPaid ? "Оплачено ✅" : "Не оплачено 🛑"}
${
  paymentInfo.isPaid
    ? `📆 *Последняя оплата*: ${moment(paymentInfo.paidAt).format(
        "DD.MM.YYYY HH:MM"
      )}`
    : ""
}
`
}
