import currencyMap from "../../common/currencyMap"
import { Subscription } from "../../models/subscription"
import moment = require("moment")

export default {
  // Main menu
  SUBSCRIPTION_LIST_HEADER: "Вот список ваших подписок",
  SELECT_SUB_TO_VIEW_DETAILS: "Выберите подписку из меню",
  BACK: "🔙 Назад",
  INFO: "Детали",
  EDIT: "Изменить",
  DEBTORS: "Список должников",
  subscriptionDescription(subscription: Subscription) {
    return `${subscription.title}
🗓 Дата оплаты: ${moment(subscription.billingDate).format("DD.MM")}
🏷 Ежемесячная стоимость: ${subscription.price}${
      currencyMap[subscription.currency]
    }
👩‍👩‍👧‍👦 Стоимость для участника: ${subscription.pricePerMember}${
      currencyMap[subscription.currency]
    }`
  }
}
