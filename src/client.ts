import axios, { AxiosInstance, isAxiosError } from "axios";
import { EasyDebridError } from "./errors";

export interface EasyDebridErrorResponse {
  code?: string;
  message: string;
}

export interface EasyDebridLinkLookupResponse {
  cached: boolean[]
}

export interface EasyDebridClientOptions {
  accessToken?: string;
  env?: "production" | "sandbox";
}

export class EasyDebridClient {
  private apiClient: AxiosInstance;
  constructor(private readonly options: EasyDebridClientOptions) {
    options.env = options.env || "production";
    const baseUrl = options.env === "production" ? "https://api.easydebrid.com/api/v1" : "https://dev.easydebrid.com/api/v1";
    this.apiClient = axios.create({
      baseURL:  baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async linkLookup(urls: string[]) {
    try {
      const { data } = await this.apiClient.post<EasyDebridLinkLookupResponse>("/link/lookup", { urls });
      return data;
    } catch (error) {
      if(isAxiosError(error)){
        throw new EasyDebridError(error.response?.data.message || error.message);
      }

      if(error instanceof Error) {
        throw new EasyDebridError(error.message);
      }

      throw new EasyDebridError("An unknown error occurred");
    }
  }
}