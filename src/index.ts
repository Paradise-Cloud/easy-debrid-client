import axios, { AxiosInstance } from "axios";

export interface EasyDebridOptions {
  apiUrl: string;
  clientId: string;
  clientSecret: string;
}

export class EasyDebrid {
  private apiClient: AxiosInstance;
  constructor(private readonly options: EasyDebridOptions) {
    if (!options.apiUrl) {
      throw new Error("apiUrl is required");
    }

    if (!options.clientId) {
      throw new Error("clientId is required");
    }

    if (!options.clientSecret) {
      throw new Error("clientSecret is required");
    }

    this.apiClient = axios.create({
      baseURL: options.apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
