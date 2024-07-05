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
  days: number;
}

export interface EasyDebridListResellerCouponsResponse {
  coupons: Coupon[];
}

export interface Coupon {
  coupon: string;
  days: number;
  created: string;
  expires: string;
}

export interface EasyDebridMerchantOptions {
  accessToken?: string;
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
        authorization: `Bearer ${this.options.accessToken}`,
      },
    });
  }

  async getResellerPrices() {
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

  async topupResellerBalance(amount: number) {
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

  async getResellerBalance() {
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

  async generateResellerCoupon(days: number) {
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

  async listResellerCoupons() {
    try {
      const { data } =
        await this.apiClient.get<EasyDebridListResellerCouponsResponse>(
          "/reseller/prices",
        );
      return data;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }
}
