import { PaymentPlansEntity } from "@foudroyer/interfaces"

export const getProductIdByPlan = (
  plan: PaymentPlansEntity,
  interval: "monthly" | "yearly" = "monthly"
) => {
  if (plan === PaymentPlansEntity.indexation && interval === "monthly")
    return "851087"
  if (plan === PaymentPlansEntity.enterprise && interval === "monthly")
    return "855460"
  if (plan === PaymentPlansEntity.newbie && interval === "monthly")
    return "858335"

  if (plan === PaymentPlansEntity.indexation && interval === "yearly")
    return "855536"
  if (plan === PaymentPlansEntity.enterprise && interval === "yearly")
    return "855537"
  if (plan === PaymentPlansEntity.newbie && interval === "yearly")
    return "858337"

  throw new Error(`Le plan n'existe pas ${plan}`)
}
