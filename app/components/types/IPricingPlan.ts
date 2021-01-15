import type { IconType } from 'react-icons'

export default interface IPricingPlan {
  id: string
  title: string
  price: number | string
  perks: Array<string>
  icon: IconType
}
