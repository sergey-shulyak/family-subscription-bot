import dotenv from "dotenv-safe"
import logger from "./logger"

interface AppConfig {
  TELEGRAM_BOT_API_TOKEN: string

  TELEGRAM_SESSION_HOST: string
  TELEGRAM_SESSION_PORT: number

  SUBSCRIPTION_TITLE: string
  SUBSCRIPTION_OWNER_ID: number
  SUBSCRIPTION_CARD_NUMBER: string
  SUBSCRIPTION_PRICE: number
  SUBSCRIPTION_PRICE_PER_MEMBER: number
  SUBSCRIPTION_CURRENCY: string
  SUBSCRIPTION_BILLING_DATE: Date

  PAYMENT_CURRENCY: string

  PRIVAT_URL: string

  DB_HOST: string
  DB_PORT: number
  DB_DATABASE: string
  DB_USERNAME: string
  DB_PASSWORD: string

  LOCALE: string
}

const env = dotenv.config()

if (env.error !== undefined) {
  throw env.error
}

if (process.env.PRINT_ENV === "true") {
  logger.debug("Environment:", JSON.stringify(env.parsed, null, 2))
}

export default (env.parsed as unknown) as AppConfig
