export const submitPaymentResponse = (paymentTime: Date): string => `
Спасибо! Отправленное время оплаты: ${paymentTime.toLocaleString("ru")}`
