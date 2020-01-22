import logger from "./config/logger"
import { start as startBot, bot } from "./bot"
import { pool } from "./db"

function gracefulShutdown(): void {
  logger.info("Starting graceful shutdown")

  pool.end(() => {
    logger.info("Database pool closed")
  })

  bot
    .stop()
    .then(() => {
      logger.info("Telegram bot polling stopped")
    })
    .catch((err) => {
      logger.error(err, "Failed to stop Telegram bot polling")
    })

  logger.info("Graceful shutdown complete. Exiting")
  process.exit()
}

process.on("SIGTERM", gracefulShutdown)
process.on("SIGINT", gracefulShutdown)

startBot()
  .then(() => logger.info("Bot has started"))
  .catch((err: Error) => logger.error(err, "Failed to start the bot"))
