import type { V2_MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { FaArrowRight, FaChartBar, FaDollarSign } from 'react-icons/fa'

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Expensify' },
    {
      name: 'description',
      content: 'A simple bank manager with focus of expenses management',
    },
  ]
}

export default function Index() {
  return (
    <>
      <section className="marketing-section">
        <header>
          <FaDollarSign />
          <h2>A Central Space</h2>
        </header>
        <div className="marketing-content">
          <div className="marketing-image">
            <img
              src="images/expenses-management.jpg"
              alt="A list of expenses."
            />
          </div>
          <div className="marketing-explanation">
            <p>Manage your expenses in one central place.</p>
            <p>
              <Link className="cta" to="/expenses">
                <span>Get Started</span>
                <FaArrowRight />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <header>
          <FaChartBar />
          <h2>Detailed Analytics</h2>
        </header>
        <div className="marketing-content">
          <div className="marketing-content__details">
            <p className="marketing-explanation">
              Benefit from best-in-class analytics to understand your spending
              patterns.
            </p>
            <p>
              <Link className="cta" to="/expenses/analysis">
                <span>Review</span>
                <FaArrowRight />
              </Link>
            </p>
          </div>
          <div className="marketing-image">
            <img src="images/expenses-chart.jpg" alt="A demo bar chart." />
          </div>
        </div>
      </section>
    </>
  )
}
