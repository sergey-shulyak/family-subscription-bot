import { pool } from "../db"
import { mapDbNames as camelCaseKeys } from "../helpers/dbNameMapper"

interface UserProps {
  telegramId: number
  firstName: string
  lastName?: string
  username?: string
}

export class User {
  public telegramId: number
  public firstName: string
  public lastName?: string
  public username?: string

  constructor({ telegramId, firstName, lastName, username }: UserProps) {
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
    firstName,
    lastName,
    username
  }: UserProps): Promise<void> {
    await pool.query(
      "INSERT INTO users (telegram_id, first_name, last_name, username) VALUES ($1, $2, $3, $4)",
      [telegramId, firstName, lastName, username]
    )
  }

  public static async findAllByIds(ids: number[]): Promise<User[]> {
    const result = await pool.query(
      "SELECT * FROM users WHERE telegram_id IN ($1)",
      [ids.join(", ")]
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
}
