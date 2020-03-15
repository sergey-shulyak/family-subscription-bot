/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate"

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn("users", {
    chat_id: { type: "int", notNull: true }
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
