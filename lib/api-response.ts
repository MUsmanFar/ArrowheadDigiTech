import { NextResponse } from 'next/server';

export type ApiErrorBody = {
  error: string;
  code?: string;
  details?: unknown;
};

export function apiError(
  message: string,
  status: number,
  options?: { code?: string; details?: unknown },
): NextResponse<ApiErrorBody> {
  const body: ApiErrorBody = { error: message };
  if (options?.code) body.code = options.code;
  if (options?.details !== undefined) body.details = options.details;
  return NextResponse.json(body, { status });
}

export function apiOk<T>(data: T, status = 200): NextResponse<T> {
  return NextResponse.json(data, { status });
}

export function safeErrorMessage(error: unknown, fallback = 'Internal Server Error'): string {
  if (process.env.NODE_ENV !== 'production') {
    if (error instanceof Error) return error.message;
    return String(error);
  }
  return fallback;
}
