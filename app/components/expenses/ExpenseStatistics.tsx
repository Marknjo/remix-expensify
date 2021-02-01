import type { Expense } from '@prisma/client'
import { useMemo } from 'react'
import { formatCurrency } from '../utils/format-currency'

function calculateSummaryStatistics(expenses: Expense[]) {
  const amounts = expenses.map(expense => +expense.amount)
  const maxAmount = Math.max(...amounts)
  const minAmount = Math.min(...amounts)
  const sum = expenses.reduce((prevVal, curVal) => curVal.amount + prevVal, 0)
  const mean = sum / expenses.length

  return { minAmount, maxAmount, sum, mean }
}

function ExpenseStatistics({ expenses }: { expenses: Expense[] }) {
  const currencyCode = expenses.at(0)!.currencyCode
  const locale = expenses.at(0)!.locale

  const { minAmount, maxAmount, sum, mean } = useMemo(
    () => calculateSummaryStatistics(expenses),
    [expenses],
  )

  return (
    <section>
      <h2>Summary Statistics</h2>
      <dl id="expense-statistics">
        <div>
          <dt>Total</dt>
          <dd> {formatCurrency(sum, locale, currencyCode)}</dd>
        </div>
        <div>
          <dt>Average</dt>
          <dd>{formatCurrency(mean, locale, currencyCode)}</dd>
        </div>
        <div>
          <dt> Min. Amount</dt>
          <dd>{formatCurrency(minAmount, locale, currencyCode)}</dd>
        </div>
        <div>
          <dt>Max. Amount</dt>
          <dd>{formatCurrency(maxAmount, locale, currencyCode)}</dd>
        </div>
      </dl>
    </section>
  )
}

export default ExpenseStatistics
