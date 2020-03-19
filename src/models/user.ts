import { pool } from "../db"
import { mapDbNames as camelCaseKeys } from "../helpers/dbNameMapper"
import { DatabaseError } from "../errors/customErrors"

interface UserProps {
  telegramId: number
  chatId: number
  firstName: string
  lastName?: string
  username?: string
}

export class User {
  public telegramId: number
  public chatId: number
  public firstName: string
  public lastName?: string
  public username?: string

  constructor({
    telegramId,
    chatId,
    firstName,
    lastName,
    username
  }: UserProps) {
    this.telegramId = telegramId
    this.chatId = chatId
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

  // public static async findById(id: string): Promise<User | null> {
  //   const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])

  //   if (result.rowCount === 0) {
  //     return null
  //   }

  //   const userData = camelCaseKeys<UserProps>(result.rows[0])

  //   return new User(userData)
  // }

  public static async create({
    telegramId,
    chatId,
    firstName,
    lastName,
    username
  }: UserProps): Promise<void> {
    const {
      rowCount
    } = await pool.query(
      "INSERT INTO users (telegram_id, chat_id, first_name, last_name, username) VALUES ($1, $2, $3, $4, $5)",
      [telegramId, chatId, firstName, lastName, username]
    )

    if (rowCount !== 1) {
      throw new DatabaseError("Failed to save user to DB")
    }
  }

  public static async findAllByIds(ids: number[]): Promise<User[]> {
    const result = await pool.query(
      "SELECT * FROM users WHERE telegram_id ANY (string_to_array($1, ',')::int[])",
      [ids.join(",")]
    )

    if (result.rowCount === 0) {
      return []
    }

    return result.rows.map((row) => new User(camelCaseKeys<User>(row)))
  }

  public static async findAllExceptAdmin(adminId: number): Promise<User[]> {
    const result = await pool.query(
      "SELECT * FROM users WHERE telegram_id != $1",
      [adminId]
    )

    if (result.rowCount === 0) {
      return []
    }

    return result.rows.map((row) => new User(camelCaseKeys<User>(row)))
  }

  public static async findAllChatIds(
    usersToPayIds: number[]
  ): Promise<number[]> {
    const result = await pool.query(
      "SELECT chat_id FROM users WHERE telegram_id = ANY (string_to_array($1, ',')::int[])",
      [usersToPayIds.join(",")]
    )

    if (result.rowCount === 0) {
      return []
    }

    return result.rows.map((row) => row.chat_id)
  }
}
