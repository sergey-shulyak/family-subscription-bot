export default {
  HEADER: "Добро пожаловать, подписчик",
  ADD_SUBSCRIPTION: "Добавить подписку",
  WRITE_SUBSCRIPTION_ID: "Напишите id подписки",
  SUBSCRIPTION_LIST: "Мои подписки",
  LOGOUT: "Выйти",

  NO_SUBSCRIPTION_FOUND: "Подписки с таким id не существует",

  subscriptionConfirmationInfo: ({
    subscriptionTitle,
    ownerUsername
  }: {
    subscriptionTitle: string
    ownerUsername?: string
  }): string => `<b>${subscriptionTitle}</b>
Владелец: @${ownerUsername}`,

  CONFIRM: "Добавить",
  CANCEL: "Отмена",

  SUBSCRIPTION_SUBMITTED: "Подписка успешно оформлена"
}
