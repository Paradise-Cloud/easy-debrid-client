import { CouponSubmitResponse, EasyDebridClient, GenerateDebridLinkResponse, GetUserDetailsResponse, LinkLookupResponse } from "./easyDebridClient";

export class EasyDebridService {
  constructor(private readonly easyDebridClient: EasyDebridClient) {}

  async getAccountInfo(): Promise<GetUserDetailsResponse> {
    return this.easyDebridClient.getAccountInfo();
  }

  async submitCoupon(
    // accessToken: string,
    coupon: string,
  ): Promise<CouponSubmitResponse> {
    return this.easyDebridClient.submitCoupon( coupon);
  }

  async linkLookup(
    urls: string[],
  ): Promise<LinkLookupResponse> {
    return this.easyDebridClient.linkLookup( urls);
  }

  async generateDebridLink(
    Url: string,
  ): Promise<GenerateDebridLinkResponse> {
    return this.easyDebridClient.generateDebridLink( Url);
  }
}
