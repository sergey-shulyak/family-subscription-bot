import env from "../config/env"
import { Payment } from "../models/payment"
import moment, { Moment } from "moment"
import { User } from "../models/user"
import isEmpty from "lodash/isEmpty"
import pick from "lodash/pick"
import { getExchangeRates } from "../api/currencyExchangeApi"
import { convertCurrency } from "nodejs-currency-converter"

export interface SubscriberPaymentInfo {
  isPaid: boolean
  paidAt?: Date
}

export function previousBillingDate(): Moment {
  const currentDate = moment()

  const billingDate = moment(env.SUBSCRIPTION_BILLING_DATE).set({
    month: currentDate.get("month"),
    year: currentDate.get("year")
  })

  return billingDate.isBefore(currentDate)
    ? billingDate
    : billingDate.subtract(1, "month")
}

export function nextBillingDate(): Moment {
  return previousBillingDate().add(1, "month")
}

function isSubscriptionPaid(paymentDate: Moment): boolean {
  const latestPaymentDate = moment(paymentDate)

  return latestPaymentDate.isBetween(previousBillingDate(), nextBillingDate())
}

export async function getPaymentInfoForSubscriber(
  telegramId: number
): Promise<SubscriberPaymentInfo> {
  const latestPayment = await Payment.findLatestPaymentForSubscriber(telegramId)

  if (latestPayment === null) {
    return { isPaid: false }
  }

  return {
    isPaid: isSubscriptionPaid(moment(latestPayment.transactionTime)),
    paidAt: latestPayment.transactionTime
  }
}

export async function getDebtors(): Promise<User[]> {
  const debtorIds = await Payment.findAllDebtorIds(
    previousBillingDate().toDate(),
    nextBillingDate().toDate()
  )

  return isEmpty(debtorIds) ? [] : User.findAllByIds(debtorIds)
}

export async function getPaymentPrice(): Promise<number> {
  // const rates = pick(
  //   await getExchangeRates(),
  //   "EUR",
  //   env.SUBSCRIPTION_CURRENCY.toUpperCase(),
  //   env.PAYMENT_CURRENCY.toUpperCase()
  // )

  return convertCurrency(
    env.SUBSCRIPTION_PRICE_PER_MEMBER,
    env.SUBSCRIPTION_CURRENCY,
    env.PAYMENT_CURRENCY
  )

  // TODO: Maybe use another API without this damn conversion
  // const conversionRate =
  //   rates.EUR *
  //   rates[env.SUBSCRIPTION_CURRENCY.toUpperCase()] *
  //   rates[env.PAYMENT_CURRENCY.toUpperCase()]

  // console.log("R", conversionRate)

  // return env.SUBSCRIPTION_PRICE_PER_MEMBER * conversionRate
}
