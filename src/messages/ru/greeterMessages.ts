export default {
  GREETING_HEADER: "Привет! Кто ты?",
  GREETING_ROLE_USER: "Подписчик",
  GREETING_ROLE_ADMIN: "Владелец подписки",
  greetingRoleSet: (role: string) => `Вы вошли как ${role}`
}
