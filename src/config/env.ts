import dotenv from "dotenv-safe"
import dotenvParseVariables from "dotenv-parse-variables"
import pick from "lodash/pick"

import logger from "./logger"

type CurrencyCode = "USD" | "EUR"

interface AppConfig {
  TELEGRAM_BOT_API_TOKEN: string

  DATABASE_URL: string
  REDIS_URL: string

  SUBSCRIPTION_TITLE: string
  SUBSCRIPTION_OWNER_ID: number
  SUBSCRIPTION_CARD_NUMBER: string
  SUBSCRIPTION_PRICE: number
  SUBSCRIPTION_PRICE_PER_MEMBER: number
  SUBSCRIPTION_CURRENCY: CurrencyCode
  SUBSCRIPTION_BILLING_DATE: Date

  PAYMENT_CURRENCY: string

  PRIVAT_URL: string

  LOCALE: string
}

let config

if (process.env.NODE_ENV === "production") {
  const envExample = dotenv.config({
    path: ".env.example",
    allowEmptyValues: true
  })

  const processEnv = pick(process.env, Object.keys(envExample.parsed ?? {}))

  config = dotenvParseVariables(processEnv as Record<string, string>)
} else {
  const env = dotenv.config()

  if (env.error !== undefined || env.parsed === undefined) {
    throw env.error
  }

  config = dotenvParseVariables(env.parsed)
}

if (process.env.PRINT_ENV === "true") {
  logger.debug("Environment:", JSON.stringify(config, null, 2))
}

export default (config as unknown) as AppConfig
