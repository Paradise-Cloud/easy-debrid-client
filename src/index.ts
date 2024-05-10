import axios, { AxiosInstance } from "axios";
import { EasyDebridClient } from "./easyDebridClient";

export interface EasyDebridOptions {
  apiUrl: string;
  clientId: string;
  clientSecret: string;
}

export class EasyDebrid {
  private apiClient: AxiosInstance;
  public easyDebridClient: EasyDebridClient;
  constructor(private readonly options: EasyDebridOptions) {

    
    this.options.apiUrl = process.env.API_URL!;
    this.options.clientId = process.env.CLIENT_ID!;
    this.options.clientSecret = process.env.CLIENT_SECRET!;
    
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


    const PKCE = this.options.clientSecret;
    const apiClient = this.apiClient;
    const clientId = this.options.clientId;

    this.easyDebridClient = new EasyDebridClient(
      clientId,
      PKCE,
      apiClient,
    );
  }
}
