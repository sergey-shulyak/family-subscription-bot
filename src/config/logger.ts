import logger from "pino"

// For future configuration

const config: logger.LoggerOptions = {
  level: process.env.NODE_ENV === "development" ? "debug" : "info"
}

export default logger(config)
