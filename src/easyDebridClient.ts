import axios, { AxiosInstance } from "axios";
// export interface AccessLinkRequest {
//   token: string;
// }

export interface GetUserDetailsResponse {
  id: string;
  paid_until: string;
}

export interface CouponSubmitRequest {
  coupon: string;
}

export interface CouponSubmitResponse {
  result: string;
}

export interface LinkLookupRequest {
  urls: string[];
}

export interface LinkLookupResponse {
  cached: boolean[];
}

export interface GenerateDebridLinkRequest {
  url: string;
}

export interface GenerateDebridLinkResponse {
  files: File[];
}

export interface File {
  path: string;
  size: number;
  url: string;
}

// export interface AccessLinkResponse {
//   link: string;
// }

export class EasyDebridClient {
  // private readonly authClient: AxiosInstance;
  constructor(
    readonly clientId: string,
    readonly PKCE: string,
    public apiClient: AxiosInstance,
  ) {
    // const authBaseUrl = "https://dev.easydebrid.com/api/v1";
    // this.authClient = axios.create({ baseURL: authBaseUrl });
  }

  // async generateAccessLink(
  //   token: string,
  // ): Promise<AccessLinkResponse> {
  //   const url = '/connect/token';
  //   const data: AccessLinkRequest = {
  //     token,
  //   };
  //   const response = await this.authClient.post<AccessLinkResponse>(
  //     url,
  //     data,
  //   );

  //   return response.data;
  // }

  async getAccountInfo(
    // accessToken: string
    ): Promise<GetUserDetailsResponse> {
    const url = "/user/details";
    const headers = {
      accept: "application/json",
      // authorization: `Bearer ${accessToken}`,
    };

    const response = await this.apiClient.get<GetUserDetailsResponse>(url, {
      headers: headers,
    });

    return response.data;
  }

  async submitCoupon(
    // accessToken: string,
    coupon: string,
  ): Promise<CouponSubmitResponse> {
    const url = "/coupon/submit";
    const headers = {
      accept: "application/json",
      // authorization: `Bearer ${accessToken}`,
    };
    const data: CouponSubmitRequest = {
      coupon,
    };
    const response = await this.apiClient.post<CouponSubmitResponse>(
      url,
      data,
      {
        headers: headers,
      },
    );

    return response.data;
  }

  async linkLookup(
    // accessToken: string,
    urls: string[],
  ): Promise<LinkLookupResponse> {
    const url = "/link/lookup";
    const headers = {
      accept: "application/json",
      // authorization: `Bearer ${accessToken}`,
    };
    const data: LinkLookupRequest = {
      urls,
    };
    const response = await this.apiClient.post<LinkLookupResponse>(url, data, {
      headers: headers,
    });

    return response.data;
  }

  async generateDebridLink(
    // accessToken: string,
    Url: string,
  ): Promise<GenerateDebridLinkResponse> {
    const url = "/link/generate";
    const headers = {
      accept: "application/json",
      // authorization: `Bearer ${accessToken}`,
    };
    const data: GenerateDebridLinkRequest = {
      url: Url,
    };
    const response = await this.apiClient.post<GenerateDebridLinkResponse>(
      url,
      data,
      {
        headers: headers,
      },
    );

    return response.data;
  }
}
