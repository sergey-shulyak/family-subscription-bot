import env from "../config/env"
import logger from "../config/logger"
import { Pool } from "pg"

export const pool = new Pool({
  connectionString: env.DATABASE_URL
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
