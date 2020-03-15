import { pool } from "../db"
import { mapDbNames as camelCaseKeys } from "../helpers/dbNameMapper"

interface PaymentProps {
  transactionAmount: number
  transactionCurrency: string
  transactionTime?: Date
  subscriberId?: number
}

export class Payment {
  public id?: string
  public transactionAmount: number
  public transactionCurrency: string
  public transactionTime?: Date
  public subscriberId?: number

  constructor({
    transactionAmount,
    transactionCurrency,
    transactionTime,
    subscriberId
  }: PaymentProps) {
    this.transactionAmount = transactionAmount
    this.transactionCurrency = transactionCurrency
    this.transactionTime = transactionTime
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
    previousBillingDate: Date,
    nextBillingDate: Date
  ): Promise<number[]> {
    const result = await pool.query(
      `
        SELECT DISTINCT subscriber_id FROM payments
        WHERE transaction_time NOT BETWEEN $1 AND $2
      `,
      [previousBillingDate, nextBillingDate]
    )

    if (result.rowCount === 0) {
      return []
    }

    return result.rows.map((row) => row.subscriber_id) as number[]
  }

  // public static async create({
  //   telegramId,
  //   firstName,
  //   lastName,
  //   username
  // }: PaymentProps): Promise<void> {
  //   await pool.query(
  //     "INSERT INTO users (telegram_id, first_name, last_name, username) VALUES ($1, $2, $3, $4)",
  //     [telegramId, firstName, lastName, username]
  //   )
  // }
}
