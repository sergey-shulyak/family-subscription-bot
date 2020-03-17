import { formatCardNumber } from "../../helpers/creditCardUtils"
import { createFormatter } from "../../common/currencyFormatter"
import env from "../../config/env"

const subscriptionFormatter = createFormatter(env.SUBSCRIPTION_CURRENCY)
const paymentFormatter = createFormatter(env.PAYMENT_CURRENCY)

export default {
  paymentDetails: (
    subscriptionTitle: string,
    price: number,
    priceInSubscriptionCurrency: number
  ) => `
*${subscriptionTitle}*
*Сумма*: ${paymentFormatter.format(price)} (${subscriptionFormatter.format(
    priceInSubscriptionCurrency
  )})
*Номер карты*:
`,

  cardNumber: (cardNumber: string) => formatCardNumber(cardNumber)
}
