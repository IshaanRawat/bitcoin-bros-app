import { ApiResponseError } from "twitter-api-v2";

const isRateLimitError = (error: any) =>
  error instanceof ApiResponseError && error.rateLimitError && error.rateLimit;

export { isRateLimitError };
