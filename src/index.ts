import logger from "./config/logger"
import { start as startBot } from "./bot"

startBot()
  .then(() => logger.info("Bot has started"))
  .catch((err: Error) => logger.error(err, "Failed to start the bot"))
