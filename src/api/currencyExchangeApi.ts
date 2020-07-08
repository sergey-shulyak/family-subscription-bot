import env from "../config/env"
import axios from "axios"
import cheerio from "cheerio"
import { IExchangeRate } from "./currencyExchangeInterfaces"

const EXCHANGE_RATE_URL = `${env.PRIVAT_URL}?exchange&json&coursid=11`

const nbuSelectors: {
  [key: string]: string
} = {
  EUR:
    "#widget > div:nth-child(1) > article > div:nth-child(4) > div > table > tbody > tr:nth-child(1) > td:nth-child(3)",
  USD:
    "#widget > div:nth-child(1) > article > div:nth-child(4) > div > table > tbody > tr:nth-child(2) > td:nth-child(3)"
}

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
