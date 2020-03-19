import { User as TelegramUser } from "telegraf/typings/telegram-types"
import { User } from "../models/user"
import { Payment } from "../models/payment"
import env from "../config/env"
import { DataError } from "../errors/customErrors"
import { nextBillingDate, previousBillingDate } from "./paymentService"
import logger from "../config/logger"

export async function isUserExists(telegramId: number): Promise<boolean> {
  return (await User.findByTelegramId(telegramId)) !== null
}

export async function saveUser(
  userData: TelegramUser,
  chatId: number
): Promise<void> {
  await User.create({
    telegramId: userData.id,
    chatId,
    firstName: userData.first_name,
    lastName: userData.last_name,
    username: userData.username
  })
}

export async function getAdminInfo(): Promise<User> {
  const adminInfo = await User.findByTelegramId(env.SUBSCRIPTION_OWNER_ID)

  if (adminInfo === null) {
    throw new DataError("Admin info is empty in DB")
  }

  return adminInfo
}

export async function getSubscribers(): Promise<User[]> {
  return User.findAllExceptAdmin(env.SUBSCRIPTION_OWNER_ID)
}

export async function getUserByTelegramId(
  telegramId: number
): Promise<User | null> {
  return User.findByTelegramId(telegramId)
}

export async function getChatIdsForPayment(): Promise<number[]> {
  const subscribersToPay = await Payment.findAllDebtorIds(
    previousBillingDate().toDate(),
    nextBillingDate().toDate(),
    (await getAdminInfo()).telegramId
  )

  logger.debug("Subs", subscribersToPay)
  return User.findAllChatIds(subscribersToPay)
}
