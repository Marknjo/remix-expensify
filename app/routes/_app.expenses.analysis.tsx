import Chart from '~/components/expenses/Chart'
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics'
import { DUMMY_EXPENSES } from '~/data'

export default function ExpensesAnalysisPage() {
  return (
    <>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </>
  )
}