import { IPaymentService } from "../interfaces/IPaymentService"

export class InMemoryPaymentService implements IPaymentService {
  async openDialog(params: {
    email: string
    productId: string | number
    coupon_code?: string
    customData: { userId: string; websiteId: string }
  }): Promise<{ status: "success" | "closed" }> {
    if (params.email === "closed") return { status: "closed" }
    return { status: "success" }
  }
}
