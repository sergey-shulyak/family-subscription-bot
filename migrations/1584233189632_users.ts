/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate"

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("users", {
    telegram_id: { type: "int", primaryKey: true },
    first_name: { type: "varchar(30)", notNull: true },
    last_name: { type: "varchar(40)" },
    username: { type: "varchar(30)" },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
