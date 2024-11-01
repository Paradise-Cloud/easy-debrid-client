import axios, { AxiosInstance } from "axios";
import { toEasyDebridError } from "./errors";
import { getApiUrl } from "./utils";

export interface EasyDebridGetResellerPricesResponse {
  prices: Price[];
}

export interface Price {
  price: number;
  days: number;
}

export interface EasyDebridTopupResellerBalanceResponse {
  url: string;
}

export interface EasyDebridGetResellerBalanceResponse {
  balance: number;
}

export interface EasyDebridGenerateResellerCouponResponse {
  coupon: string;
}

export interface EasyDebridListResellerCouponsResponseAPI {
  coupons: CouponAPI[];
}

export interface CouponAPI {
  coupon: string;
  days: number;
  created: string;
  expires: string;
}

export interface EasyDebridListResellerCouponsResponse {
  coupons: Coupon[];
}

export interface Coupon {
  coupon: string;
  days: number;
  created: Date;
  expires: Date;
}

export interface EasyDebridMerchantOptions {
  apiKey?: string;
  env?: "production" | "sandbox";
}

export class EasyDebridMerchant {
  private apiClient: AxiosInstance;
  constructor(private readonly options: EasyDebridMerchantOptions) {
    options.env = options.env || "production";
    const baseUrl = getApiUrl(options.env);
    this.apiClient = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.options.apiKey}`,
      },
    });
  }

  async getResellerPrices(): Promise<EasyDebridGetResellerPricesResponse> {
    try {
      const { data } =
        await this.apiClient.get<EasyDebridGetResellerPricesResponse>(
          "/reseller/prices",
        );
      return data;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }

  async topupResellerBalance(amount: number): Promise<EasyDebridTopupResellerBalanceResponse> {
    try {
      const { data } =
        await this.apiClient.post<EasyDebridTopupResellerBalanceResponse>(
          "/reseller/topup",
          { amount },
        );
      return data;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }

  async getResellerBalance(): Promise<EasyDebridGetResellerBalanceResponse> {
    try {
      const { data } =
        await this.apiClient.get<EasyDebridGetResellerBalanceResponse>(
          "/reseller/balance",
        );
      return data;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }

  async generateResellerCoupon(days: number): Promise<EasyDebridGenerateResellerCouponResponse> {
    try {
      const { data } =
        await this.apiClient.post<EasyDebridGenerateResellerCouponResponse>(
          "/reseller/generatecoupon",
          { days },
        );
      return data;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }

  async listResellerCoupons(): Promise<EasyDebridListResellerCouponsResponse> {
    try {
      const { data } =
        await this.apiClient.get<EasyDebridListResellerCouponsResponseAPI>(
          "/reseller/coupons",
        );

      const transformedData: EasyDebridListResellerCouponsResponse = {
        coupons: data.coupons.map((coupon) => ({
          ...coupon,
          created: new Date(coupon.created),
          expires: new Date(coupon.expires),
        })),
      };

      return transformedData;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }
}
