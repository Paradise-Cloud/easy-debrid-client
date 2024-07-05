export const PROD_HOST = "https://easydebrid.com";
export const DEV_HOST = "https://dev.easydebrid.com";

export function getHost(env: string): string {
  return env === "production" ? PROD_HOST : DEV_HOST;
}

export function getApiUrl(env: string): string {
  return `${getHost(env)}/api/v1`;
}
