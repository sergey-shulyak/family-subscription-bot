import dotenv from "dotenv-safe"
import logger from "./logger"

interface AppConfig {
  TELEGRAM_BOT_API_TOKEN: string

  TELEGRAM_SESSION_HOST: string
  TELEGRAM_SESSION_PORT: number

  DB_HOST: string
  DB_PORT: number
  DB_DATABASE: string
  DB_USERNAME: string
  DB_PASSWORD: string
}

const env = dotenv.config()

if (env.error !== undefined) {
  throw env.error
}

if (process.env.PRINT_ENV === "true") {
  logger.debug("Environment:", JSON.stringify(env.parsed, null, 2))
}

export default (env.parsed as unknown) as AppConfig
