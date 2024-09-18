import { PaymentEntity, PaymentPlansEntity } from "@foudroyer/interfaces"

export const howManyWebsitesUserCanHave = (plan?: PaymentEntity | null) => {
  if (!plan) return 1
  if (new Date(plan.created_at) < new Date("2024-05-23")) return 1000
  if (plan.plan === PaymentPlansEntity["enterprise"]) return 1000
  if (plan.plan === PaymentPlansEntity["indexation/teams"]) return 20
  if (plan.plan === PaymentPlansEntity["indexation"]) return 10
  if (plan.plan === PaymentPlansEntity["newbie"]) return 1
  return 1
}
