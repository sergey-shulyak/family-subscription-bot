import currencyMap from "../../common/currencyMap"
import { formatCardNumber } from "../../helpers/creditCardUtils"

export default {
  paymentDetails: (
    subscriptionTitle: string,
    price: number,
    currency: string
  ) => `
*${subscriptionTitle}*
*Сумма*: ${price} ${currencyMap[currency]}
900404674
*Номер карты*:
`,

  cardNumber: (cardNumber: string) => formatCardNumber(cardNumber)
}
