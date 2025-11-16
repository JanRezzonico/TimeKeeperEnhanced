import type { Request } from "express";

/**
 * Runtime + TypeScript assertion for any value.
 * Throws if the value is falsy, with a helpful message.
 *
 * @param value - the value to assert
 * @param req - request object (optional), used to build a descriptive message
 * @param message - optional custom message
 */
export function assert<T>(
  value: T | undefined | null | false,
  req?: Request,
  message?: string
): asserts value is T {
  if (!value) {
    const context = req ? ` at ${req.method} ${req.originalUrl}` : "";
    throw new Error(message ?? `Assertion failed${context}`);
  }
}
