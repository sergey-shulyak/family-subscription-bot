import logger from "./config/logger"
import { start as startBot, bot } from "./bot"
import { pool } from "./db"

const logInfo = (message: string) => () => {
  logger.info(message)
}

const logError = (message: string) => (err: Error) => {
  logger.error(err, message)
}

const closeDbPool: () => Promise<void> = async () => {
  logger.info("Closing database connection pool...")

  return pool
    .end()
    .then(logInfo("Database connection pool closed"))
    .catch(logError("Failed to close database connection pool"))
}

const stopBot: () => Promise<void> = async () => {
  logger.info("Stopping bot polling...")

  return bot
    .stop()
    .then(logInfo("Bot polling stopped"))
    .catch(logError("Failed to stop bot polling"))
}

async function shutdownSequence(): Promise<void> {
  await stopBot()
  await closeDbPool()
}

function shutDownGracefully(): void {
  logger.info("Starting graceful shutdown")

  shutdownSequence()
    .then(() => {
      logger.info("Graceful shutdown complete. Exiting")
      process.exit()
    })
    .catch(logError("Failed to shutdown gracefully"))
}

// process.on("SIGINT", shutDownGracefully)
// process.on("SIGTERM", shutDownGracefully)

startBot()
  .then(() => logger.info("Bot has started"))
  .catch((err: Error) => logger.error(err, "Failed to start the bot"))
