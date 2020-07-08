import { formatCardNumber } from "../../helpers/creditCardUtils"
import { createFormatter } from "../../common/currencyFormatter"
import env from "../../config/env"

const subscriptionFormatter = createFormatter(env.SUBSCRIPTION_CURRENCY)
const paymentFormatter = createFormatter(env.PAYMENT_CURRENCY)

export default {
  paymentDetails: (
    subscriptionTitle: string,
    price: number,
    priceInSubscriptionCurrency: number,
    cardNumber: string
  ) => `
👏 Пора плотить за ${subscriptionTitle}
💰 Сумма: ${paymentFormatter.format(price)} (${subscriptionFormatter.format(
    priceInSubscriptionCurrency
  )})
💳 Номер карты: ${formatCardNumber(cardNumber)}
`,
  CONFIRM_PAYMENT: "Оплатил 👌",
  CONFIRM_PAYMENT_SUCCESS: "Благодарю 😏",
  confirmPaymentError: (adminUsername: string) => `
Не удалось зафиксировать это знаменательное событие.
Обратись к админу (@${adminUsername}) и попробуй позже
`,
  PAYMENT_REMINDER_SENT: "Уведомление об оплате отправлено подписчикам ⏰"
}
