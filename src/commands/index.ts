import { Bot } from "../types/bot"
import commands from "./commands"
import { Middleware, ContextMessageUpdate } from "telegraf"

export function configureCommands(bot: Bot): void {
  Array.from(commands.entries()).forEach(([command, handler]) => {
    bot.command(command, handler as Middleware<ContextMessageUpdate>)
  })
}
