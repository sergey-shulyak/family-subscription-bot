import env from "../config/env"
import axios from "axios"
import { IExchangeRate } from "./currencyExchangeInterfaces"

const EXCHANGE_RATE_URL = `${env.PRIVAT_URL}?exchange&json&coursid=11`

enum ExchangeRateCodes {
  USD = "USD",
  EUR = "EUR"
}

export async function getExchangeRate(
  from: "USD" | "EUR",
  to: string = "UAH"
): Promise<number> {
  const { data: rates } = await axios.get<IExchangeRate[]>(EXCHANGE_RATE_URL)

  const rate = rates.find((rate) => rate.ccy === ExchangeRateCodes[from])?.buy

  return Number(rate)
}
