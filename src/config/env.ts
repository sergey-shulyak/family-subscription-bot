import dotenv from "dotenv-safe"
import logger from "./logger"

interface AppConfig {
  BOT_NAME: string
  TELEGRAM_BOT_API_TOKEN: string
}

const env = dotenv.config()

if (env.error !== undefined) {
  throw env.error
}

if (process.env.PRINT_ENV === "true") {
  logger.debug("Environment:", JSON.stringify(env.parsed, null, 2))
}

export default (env.parsed as unknown) as AppConfig
