import { pool } from "../db"
import {
  IsString,
  IsCreditCard,
  IsDate,
  IsNumber,
  IsEnum
} from "class-validator"

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
}
