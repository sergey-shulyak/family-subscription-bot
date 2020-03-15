import env from "../config/env"
import { Payment } from "../models/payment"
import moment, { Moment } from "moment"
import { User } from "../models/user"

export interface SubscriberPaymentInfo {
  isPaid: boolean
  paidAt?: Date
}

export class PaymentService {
  public static get previousBillingDate(): Moment {
    const currentDate = moment()

    const billingDate = moment(env.SUBSCRIPTION_BILLING_DATE).set({
      month: currentDate.get("month"),
      year: currentDate.get("year")
    })

    return billingDate.isBefore(currentDate)
      ? billingDate
      : billingDate.subtract(1, "month")
  }

  public static get nextBillingDate(): Moment {
    return this.previousBillingDate.add(1, "month")
  }

  public static isSubscriptionPaid(paymentDate: Moment): boolean {
    const latestPaymentDate = moment(paymentDate)

    return latestPaymentDate.isBetween(
      this.previousBillingDate,
      this.nextBillingDate
    )
  }

  public static async getPaymentInfoForSubscriber(
    telegramId: number
  ): Promise<SubscriberPaymentInfo> {
    const latestPayment = await Payment.findLatestPaymentForSubscriber(
      telegramId
    )

    if (latestPayment === null) {
      return { isPaid: false }
    }

    return {
      isPaid: this.isSubscriptionPaid(moment(latestPayment.transactionTime)),
      paidAt: latestPayment.transactionTime
    }
  }

  public static async getDebtors(): Promise<User[]> {
    const debtorIds = await Payment.findAllDebtorIds(
      this.previousBillingDate.toDate(),
      this.nextBillingDate.toDate()
    )

    return User.findAllByIds(debtorIds)
  }
}
