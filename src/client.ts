import axios, { AxiosInstance } from "axios";
import { toEasyDebridError } from "./errors";
import { getApiUrl, getHost } from "./utils";

export interface EasyDebridGetUserDetailsResponse {
  id: string;
  paid_until: Date;
}

export interface EasyDebridGetUserDetailsResponseAPI {
  id: string;
  paid_until: number;
}

export interface EasyDebridCouponSubmitResponse {
  success: boolean;
}

export interface EasyDebridLinkLookupResponse {
  cached: boolean[];
}

export interface EasyDebridGenerateDebridLinkResponse {
  files: File[];
}

export interface File {
  filename: string;
  directory: string[];
  size: number;
  url: string;
}

export interface EasyDebridErrorResponse {
  code?: string;
  message: string;
}

export interface EasyDebridClientOptions {
  accessToken?: string;
  env?: "production" | "sandbox";
}

export class EasyDebridClient {
  private apiClient: AxiosInstance;
  constructor(private readonly options: EasyDebridClientOptions) {
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

  async getAccountInfo(): Promise<EasyDebridGetUserDetailsResponse> {
    try {
      const { data } = await this.apiClient.get<EasyDebridGetUserDetailsResponseAPI>(
        "/user/details",
      );
  
      const transformedData: EasyDebridGetUserDetailsResponse = {
        ...data,
        paid_until: new Date(data.paid_until * 1000),
      };
  
      return transformedData;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }

  async submitCoupon(coupon: string): Promise<EasyDebridCouponSubmitResponse> {
    try {
      const { data } =
        await this.apiClient.post<EasyDebridCouponSubmitResponse>(
          "/coupon/submit",
          { coupon },
        );
      return data;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }

  async linkLookup(urls: string[]): Promise<EasyDebridLinkLookupResponse> {
    try {
      const { data } = await this.apiClient.post<EasyDebridLinkLookupResponse>(
        "/link/lookup",
        { urls },
      );
      return data;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }

  async generateDebridLink(url: string): Promise<EasyDebridGenerateDebridLinkResponse> {
    try {
      const { data } =
        await this.apiClient.post<EasyDebridGenerateDebridLinkResponse>(
          "/link/generate",
          { url },
        );
      return data;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }
}
