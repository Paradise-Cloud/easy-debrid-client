import axios, { AxiosInstance } from "axios";

export interface EasyDebridOauth2Options {
  clientId: string;
  clientSecret?: string;
  env?: "production" | "sandbox";
}

export class EasyDebridOauth2Client {
  private apiClient: AxiosInstance;
  private apiUrl: string;


  constructor(private readonly options: EasyDebridOauth2Options) {
    options.env = options.env || "production";
    this.apiUrl = options.env === "production" ? "https://api.easydebrid.com" : "https://dev.easydebrid.com";
    this.apiClient = axios.create({
      baseURL: this.apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  generateAuthorizationUrl(redirectUri: string, state?: string, scopes?: string[]) {
    const params = new URLSearchParams();

    params.append("response_type", "code");
    params.append("client_id", this.options.clientId);
    params.append("redirect_uri", redirectUri);

    if (state) {
      params.append("state", state);
    }

    if (scopes) {
      params.append("scope", scopes.join(" "));
    }

    return `${this.apiUrl}/oauth2/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string, redirectUri: string) {
    const params = new URLSearchParams();

    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);

    if (this.options.clientSecret) {
      params.append("client_secret", this.options.clientSecret);
    }

    const { data } = await this.apiClient.post("/oauth2/token", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data;
  }
}