import { pool } from "../db"
import { mapDbNames as camelCaseKeys } from "../helpers/dbNameMapper"

enum Currency {
  UAH = "uah",
  USD = "usd",
  EUR = "eur"
}

interface SubscriptionProps {
  id?: string
  title: string
  ownerId: string
  ownerCard: string
  billingDate: Date
  price: number
  pricePerMember: number
  currency: Currency
  subscribers?: string[]
}

export class Subscription {
  id?: string
  title: string
  ownerId: string
  ownerCard: string
  billingDate: Date
  price: number
  pricePerMember: number
  currency: Currency
  subscribers?: string[]

  constructor({
    id,
    title,
    ownerId,
    ownerCard,
    billingDate,
    price,
    pricePerMember,
    currency,
    subscribers
  }: SubscriptionProps) {
    this.id = id
    this.title = title
    this.ownerId = ownerId
    this.ownerCard = ownerCard
    this.billingDate = billingDate
    this.price = price
    this.pricePerMember = pricePerMember
    this.currency = currency
    this.subscribers = subscribers
  }

  // public static async findByTelegramId(
  //   tId: number
  // ): Promise<Subscription | null> {
  //   const result = await pool.query(
  //     "SELECT * FROM users WHERE telegram_id = $1",
  //     [tId]
  //   )

  //   if (result.rowCount === 0) {
  //     return null
  //   }

  //   const userData = camelCaseKeys<SubscriptionProps>(result.rows[0])

  //   return new Subscription(userData)
  // }

  // public static async create({
  //   telegramId,
  //   firstName,
  //   lastName,
  //   username
  // }: SubscriptionProps): Promise<void> {
  //   await pool.query(
  //     "INSERT INTO users (telegram_id, first_name, last_name, username) VALUES ($1, $2, $3, $4)",
  //     [telegramId, firstName, lastName, username]
  //   )
  // }
}
