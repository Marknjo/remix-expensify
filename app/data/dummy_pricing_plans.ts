import { FaHandshake, FaTrophy } from 'react-icons/fa'
import type { IPricingPlan } from '~/components/types'

export const PRICING_PLANS: IPricingPlan[] = [
  {
    id: 'p1',
    title: 'Basic',
    price: 'Free forever',
    perks: ['1 User', 'Up to 100 expenses/year', 'Basic analytics'],
    icon: FaHandshake,
  },
  {
    id: 'p2',
    title: 'Pro',
    price: '$9.99/month',
    perks: ['Unlimited Users', 'Unlimited expenses/year', 'Detailed analytics'],
    icon: FaTrophy,
  },
]
