import logger from "pino"

const config: logger.LoggerOptions = {
  level: process.env.NODE_ENV === "development" ? "debug" : "info"
}

export default logger(config)
