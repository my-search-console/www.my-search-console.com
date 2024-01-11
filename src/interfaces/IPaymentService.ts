export interface IPaymentService {
  openDialog(params: {
    email: string
    productId: string | number
    coupon_code?: string | null
    customData: { userId: string }
  }): Promise<{
    status: "success" | "closed"
  }>
}
