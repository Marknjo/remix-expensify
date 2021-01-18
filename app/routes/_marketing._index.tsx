import type { V2_MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { FaArrowRight, FaDollarSign } from 'react-icons/fa'

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
    </>
  )
}
