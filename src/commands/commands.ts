import { Middleware, ContextMessageUpdate } from "telegraf"
import submitPayment from "./submitPayment"

const commands: Map<string, Middleware<ContextMessageUpdate>> = new Map([
  ["submitPayment", submitPayment]
])

export default commands
