import { User as TelegramUser } from "telegraf/typings/telegram-types"
import { User } from "../models/user"
import env from "../config/env"
import { DataError } from "../errors/customErrors"

export class UserService {
  public static async isUserExists(telegramId: number): Promise<boolean> {
    return (await User.findByTelegramId(telegramId)) !== null
  }

  public static async saveUser(userData: TelegramUser): Promise<void> {
    await User.create({
      telegramId: userData.id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      username: userData.username
    })
  }

  public static async getAdminInfo(): Promise<User> {
    const adminInfo = await User.findByTelegramId(env.SUBSCRIPTION_OWNER_ID)

    if (adminInfo === null) {
      throw new DataError("Admin info is empty in DB")
    }

    return adminInfo
  }

  public static async getSubscribers(): Promise<User[]> {
    return User.findAllExceptAdmin(env.SUBSCRIPTION_OWNER_ID)
  }
}
