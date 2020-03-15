export function formatCardNumber(cardNumber: string): string {
  return (
    cardNumber.substr(0, 4) +
    " " +
    cardNumber.substr(4, 4) +
    " " +
    cardNumber.substr(8, 4) +
    " " +
    cardNumber.substr(12, 4)
  )
}
