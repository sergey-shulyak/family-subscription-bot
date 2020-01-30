import { pool } from "../db"
import {
  IsString,
  IsCreditCard,
  IsDate,
  IsNumber,
  IsEnum
} from "class-validator"
import { mapDbNames } from "../helpers/dbNameMapper"

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
  [key: string]: any
  id?: string

  @IsString()
  title: string

  ownerId: string

  @IsCreditCard()
  ownerCard: string

  @IsDate()
  billingDate: Date

  @IsNumber()
  price: number

  @IsNumber()
  pricePerMember: number

  @IsEnum(Currency)
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

  public static async create({
    title,
    ownerId,
    ownerCard,
    billingDate,
    price,
    pricePerMember,
    currency
  }: SubscriptionProps): Promise<void> {
    await pool.query(
      `INSERT INTO subscriptions (
        title,
        owner_id,
        owner_card,
        billing_date,
        price,
        price_per_member,
        currency
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [title, ownerId, ownerCard, billingDate, price, pricePerMember, currency]
    )
  }

  public static async findAllByOwnerId(
    ownerId: string
  ): Promise<Subscription[]> {
    const entries = await pool.query(
      "SELECT * FROM subscriptions WHERE owner_id = $1",
      [ownerId]
    )

    if (entries.rowCount === 0) {
      return []
    }

    return entries.rows.map((row) => {
      const mappedProps = mapDbNames<SubscriptionProps>(row)
      return new Subscription(mappedProps)
    })
  }

  public static async findAllBySubscriberId(
    subscriberId: string
  ): Promise<Subscription[]> {
    const entries = await pool.query(
      "SELECT * FROM subscriptions WHERE $1 = ANY (subscribers)",
      [subscriberId]
    )

    if (entries.rowCount === 0) {
      return []
    }

    return entries.rows.map((row) => {
      const mappedProps = mapDbNames<SubscriptionProps>(row)
      return new Subscription(mappedProps)
    })
  }

  public static async findByPartialId(
    subscriptionPartialId: string
  ): Promise<Subscription | null> {
    const entries = await pool.query(
      "SELECT * FROM subscriptions WHERE id::text LIKE '$1-%'",
      [subscriptionPartialId]
    )

    if (entries.rowCount === 0) {
      return null
    }

    const mappedProps = mapDbNames<SubscriptionProps>(entries.rows[0])
    return new Subscription(mappedProps)
  }

  public static async addSubscriber(
    subscriptionId: string,
    subscriberId: string
  ): Promise<void> {
    await pool.query(
      "UPDATE subscriptions SET subscribers = subscribers || $1 WHERE id = $2",
      [subscriberId, subscriptionId]
    )
  }
}
