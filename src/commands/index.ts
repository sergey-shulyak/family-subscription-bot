import { Bot } from "../types"
import commands from "./commands"

export function configureCommands(bot: Bot): void {
  Array.from(commands.entries()).forEach(([command, handler]) => {
    bot.command(command, handler)
  })
}
