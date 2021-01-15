import type { IconType } from 'react-icons'

export default interface IPricingPlan {
  title: string
  price: number | string
  perks: Array<string>
  icon: IconType
}
