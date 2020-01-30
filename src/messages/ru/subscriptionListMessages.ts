import currencyMap from "../../common/currencyMap"
import { Subscription } from "../../models/subscription"
import moment = require("moment")

export default {
  // Main menu
  SUBSCRIPTION_LIST_HEADER: "Вот список ваших подписок",
  SELECT_SUB_TO_VIEW_DETAILS: "Выберите подписку из меню",
  BACK: "Назад",
  INFO: "Детали",
  EDIT: "Изменить",
  DEBTORS: "Список должников",
  LEAVE: "Отписаться",
  subscriptionDescription(subscription: Subscription) {
    return `<b>${subscription.title}</b> (${subscription.id?.split("-")[0]})
🗓 Дата оплаты: <b>${moment(subscription.billingDate).format("DD.MM")}</b>
🏷 Ежемесячная стоимость: <b>${subscription.price}${
      currencyMap[subscription.currency]
    }</b>
👩‍👩‍👧‍👦 Стоимость для участника: <b>${subscription.pricePerMember}${
      currencyMap[subscription.currency]
    }</b>`
  }
}
