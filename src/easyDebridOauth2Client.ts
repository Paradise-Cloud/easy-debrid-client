import createAuth0Client, { Auth0Client } from "@auth0/auth0-spa-js";

export class EasyDebridOauth2Client {
  private auth0Client: Auth0Client;

  private auth0Config = {
    domain: "your-auth0-domain",
    clientId: "your-client-id",
    redirectUri: "http://localhost:3000/callback",
  };

  constructor() {
    this.auth0Client = null;
  }

  async createAuth0() {
    this.auth0Client = await createAuth0Client({
      domain: this.auth0Config.domain,
      client_id: this.auth0Config.clientId,
      redirect_uri: this.auth0Config.redirectUri,
    });
  }

  async login() {
    await this.auth0Client.loginWithRedirect();
  }

  async getUser() {
    return await this.auth0Client.getUser();
  }
}
