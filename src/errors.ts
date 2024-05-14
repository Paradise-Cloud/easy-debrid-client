import { isAxiosError } from "axios";

export class EasyDebridError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const toEasyDebridError = (error: unknown) => {
  if (isAxiosError(error)) {
    throw new EasyDebridError(
      error.response?.data.message || error.message,
    );
  }

  if (error instanceof Error) {
    throw new EasyDebridError(error.message);
  }

  throw new EasyDebridError("An unknown error occurred");
}
