export function formatCurrency(
  amount: number,
  locale: string,
  currencyCode: string,
) {
  const options = {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }

  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0
  }

  return new Intl.NumberFormat(locale, options).format(amount)
}
