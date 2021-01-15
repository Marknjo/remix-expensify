import PricingPlan from '~/components/marketing/PricingPlan'
import { PRICING_PLANS } from '~/data'

export default function PricingPage() {
  return (
    <>
      <h2>Great Product, Simple Pricing</h2>
      <ol id="pricing-plans">
        {PRICING_PLANS.map(plan => (
          <li key={plan.id} className="plan">
            <PricingPlan
              title={plan.title}
              price={plan.price}
              perks={plan.perks}
              icon={plan.icon}
            />
          </li>
        ))}
      </ol>
    </>
  )
}
