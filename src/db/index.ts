import env from "../config/env"
import logger from "../config/logger"
import { Pool } from "pg"

export const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_DATABASE,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD
})

let isConnected = false

pool.on("error", (err) => {
  logger.error(err, "Database pool error occurred")
  process.exit(1)
})

pool.on("connect", () => {
  if (isConnected) {
    return
  }

  isConnected = true
  logger.info("Connected to database")
})
