import env from "../config/env"
import axios from "axios"
import cheerio from "cheerio"

const nbuSelectors: {
  [key: string]: string
} = {
  EUR:
    "#widget > div:nth-child(1) > article > div:nth-child(4) > div > table > tbody > tr:nth-child(1) > td:nth-child(3)",
  USD:
    "#widget > div:nth-child(1) > article > div:nth-child(4) > div > table > tbody > tr:nth-child(2) > td:nth-child(3)"
}

export async function getExchangeRate(
  from: string,
  to: string = "UAH"
): Promise<number> {
  const { data: html } = await axios.get(env.PRIVAT_URL)

  const $ = cheerio.load(html)

  const rate = $(nbuSelectors[from])
    .text()
    .trim()

  return Number(rate)
}
