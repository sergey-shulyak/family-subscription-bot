import env from "../config/env"
import axios from "axios"
import mapValues from "lodash/mapValues"

export interface CurrencyExchangeRates {
  [currency: string]: number
}

export async function getExchangeRates(): Promise<CurrencyExchangeRates> {
  // exchangeRequestUrl.searchParams.append("access_key", env.FIXER_API_KEY)
  // exchangeRequestUrl.searchParams.append("base", base)
  // exchangeRequestUrl.searchParams.append("symbols", currencies.join(","))

  const {
    data: { rates }
  } = await axios.get(`${env.FIXER_API_URL}/latest`, {
    params: {
      access_key: env.FIXER_API_KEY
    }
  })

  return mapValues(rates, Number)
}
