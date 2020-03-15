/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate"

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType("currency", ["uah", "usd", "eur"])

  pgm.createTable("payments", {
    id: "id",
    transaction_amount: { type: "decimal" },
    transaction_currency: { type: "currency" },
    transaction_time: { type: "timestamp" },
    // transaction_status: { type: "" },
    subscriber_id: {
      type: "int",
      notNull: true,
      references: "users(telegram_id)"
    }
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
