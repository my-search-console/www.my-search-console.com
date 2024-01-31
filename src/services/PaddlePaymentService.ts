import { IPaymentService } from "../interfaces/IPaymentService"

export class PaddlePaymentService implements IPaymentService {
  openDialog(params: {
    email: string
    productId: string | number
    coupon_code?: string
    customData: {
      userId: string
    }
  }): Promise<{ status: "success" | "closed" }> {
    return new Promise((resolve, reject) => {
      window.Paddle.Setup({ vendor: 184978 })

      const isReferral = window.tolt_referral
      const coupon = params.coupon_code || (isReferral ? "AFFILIATED" : "")

      window.Paddle.Checkout.open({
        product: params.productId,
        email: params.email,
        allowQuantity: false,
        quantity: 1,
        disableLogout: true,
        displayModeTheme: "light",
        marketingConsent: 1,
        coupon,
        customData: {
          userId: params.customData.userId,
          tolt_referral: window.tolt_referral,
        },
        successCallback: () => {
          resolve({ status: "success" })
        },
        closeCallback: () => {
          resolve({ status: "closed" })
        },
      })
    })
  }
}
