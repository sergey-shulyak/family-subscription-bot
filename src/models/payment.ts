import { pool } from "../db"
import { mapDbNames as camelCaseKeys } from "../helpers/dbNameMapper"
import { DatabaseError } from "../errors/customErrors"

interface PaymentProps {
  subscriberId?: number
}

export class Payment {
  public id?: string
  public transactionTime?: Date
  public subscriberId?: number

  constructor({ subscriberId }: PaymentProps) {
    this.subscriberId = subscriberId
  }

  public static async findByTelegramId(tId: number): Promise<Payment | null> {
    const result = await pool.query(
      "SELECT * FROM users WHERE telegram_id = $1",
      [tId]
    )

    if (result.rowCount === 0) {
      return null
    }

    const userData = camelCaseKeys<PaymentProps>(result.rows[0])

    return new Payment(userData)
  }

  public static async findLatestPaymentForSubscriber(
    tId: number
  ): Promise<Payment | null> {
    const result = await pool.query(
      `
        SELECT transaction_time FROM payments
        WHERE subscriber_id = $1
        ORDER BY transaction_time DESC LIMIT 1
      `,
      [tId]
    )

    if (result.rowCount === 0) {
      return null
    }

    const paymentData = camelCaseKeys<PaymentProps>(result.rows[0])

    return new Payment(paymentData)
  }

  public static async findAllDebtorIds(
    previousBilling: Date,
    nextBilling: Date,
    adminId: number
  ): Promise<number[]> {
    const result = await pool.query(
      `
        SELECT DISTINCT subscriber_id FROM payments
        WHERE transaction_time <= $1 AND transaction_time >= $2
        UNION
        SELECT chat_id FROM users
        WHERE (SELECT DISTINCT count(*) FROM payments) = 0;
      `,
      [previousBilling, nextBilling]
    )

    if (result.rowCount === 0) {
      return []
    }

    return result.rows.map((row) => row.subscriber_id) as number[]
  }

  public static async create(subscriberId: number): Promise<void> {
    const result = await pool.query(
      "INSERT INTO payments (subscriber_id) VALUES ($1)",
      [subscriberId]
    )

    if (result.rowCount === 0) {
      throw new DatabaseError(
        `Failed to create a record for payment for ${subscriberId}`
      )
    }
  }
}
