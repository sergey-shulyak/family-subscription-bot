import { User as TelegramUser } from "telegraf/typings/telegram-types"
import { User } from "../models/user"

export class UserService {
  public static async saveUser(userData: TelegramUser): Promise<void> {
    console.log("id", userData.id)

    const userExists = (await User.findByTelegramId(userData.id)) !== null

    if (userExists) {
      return
    }

    await User.create({
      telegramId: userData.id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      username: userData.username
    })
  }
}
