import { pool } from "../db"
import { mapDbNames as camelCaseKeys } from "../helpers/dbNameMapper"
import logger from "../config/logger"
import toJson from "../helpers/toJson"

interface UserProps {
  id?: string
  telegramId: number
  firstName: string
  lastName?: string
  username?: string
}

export class User {
  public id?: string
  public telegramId: number
  public firstName: string
  public lastName?: string
  public username?: string

  constructor({ id, telegramId, firstName, lastName, username }: UserProps) {
    this.id = id
    this.telegramId = telegramId
    this.firstName = firstName
    this.lastName = lastName
    this.username = username
  }

  public static async findByTelegramId(tId: number): Promise<User | null> {
    const result = await pool.query(
      "SELECT * FROM users WHERE telegram_id = $1",
      [tId]
    )

    if (result.rowCount === 0) {
      return null
    }

    const userData = camelCaseKeys<UserProps>(result.rows[0])

    return new User(userData)
  }

  public static async create({
    telegramId,
    firstName,
    lastName,
    username
  }: UserProps): Promise<void> {
    await pool.query(
      "INSERT INTO users (telegram_id, first_name, last_name, username) VALUES ($1, $2, $3, $4)",
      [telegramId, firstName, lastName, username]
    )
  }
}
