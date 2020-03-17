import env from "../config/env"

export const createFormatter = (currency: string): Intl.NumberFormat =>
  new Intl.NumberFormat(env.LOCALE, {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  })
