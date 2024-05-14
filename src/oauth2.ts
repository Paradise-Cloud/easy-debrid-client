import axios, { AxiosInstance } from "axios";
import { toEasyDebridError } from "./errors";

export interface EasyDebridOauth2Options {
  clientId: string;
  clientSecret?: string;
  env?: "production" | "sandbox";
}

export interface Oauth2TokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  scope: string;
}

export const VALID_SCOPES = ["full"] as const;
export type EasyDebridScope = (typeof VALID_SCOPES)[number];

export class EasyDebridOauth2Client {
  private readonly apiClient: AxiosInstance;
  private readonly apiUrl: string;

  constructor(private readonly options: EasyDebridOauth2Options) {
    options.env = options.env || "production";
    this.apiUrl =
      options.env === "production"
        ? "https://api.easydebrid.com"
        : "https://dev.easydebrid.com";
    this.apiClient = axios.create({
      baseURL: this.apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  generateAuthorizationUrl(
    redirectUri: string,
    state?: string,
    scopes?: EasyDebridScope[],
  ) {
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

    return `${this.apiUrl}/oauth/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(
    code: string,
    redirectUri: string,
  ): Promise<Oauth2TokenResponse> {
    const params = new URLSearchParams();

    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);

    if (this.options.clientSecret) {
      params.append("client_secret", this.options.clientSecret);
    }

    try {
      const { data } = await this.apiClient.post<Oauth2TokenResponse>(
        "/oauth/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      return data;
    } catch (error) {
      return toEasyDebridError(error);
    }
  }
}
