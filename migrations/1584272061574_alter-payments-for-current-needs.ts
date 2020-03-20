/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate"

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumns("payments", ["transaction_amount", "transaction_currency"])

  pgm.alterColumn("payments", "transaction_time", {
    type: "timestamp",
    notNull: true,
    default: pgm.func("current_timestamp")
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
