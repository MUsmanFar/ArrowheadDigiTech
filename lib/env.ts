const MIN_JWT_SECRET_LENGTH = 32;

export function validateEnvironment(
  env: NodeJS.ProcessEnv = process.env,
): void {
  const errors: string[] = [];
  const isProduction = env.NODE_ENV === 'production';
  const jwtSecret = env.JWT_SECRET?.trim();

  if (isProduction && !env.DATABASE_URL?.trim()) {
    errors.push('DATABASE_URL is required in production.');
  }

  if (isProduction && !jwtSecret) {
    errors.push('JWT_SECRET is required in production.');
  }

  if (jwtSecret && jwtSecret.length < MIN_JWT_SECRET_LENGTH) {
    errors.push(`JWT_SECRET must be at least ${MIN_JWT_SECRET_LENGTH} characters.`);
  }

  if (isProduction && env.DB_MOCK?.toLowerCase() === 'true') {
    errors.push('DB_MOCK=true is not allowed in production.');
  }

  if (errors.length > 0) {
    throw new Error(`Invalid environment configuration:\n- ${errors.join('\n- ')}`);
  }
}

export function getJwtSecret(): string {
  validateEnvironment();
  const jwtSecret = process.env.JWT_SECRET?.trim();

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not configured.');
  }

  return jwtSecret;
}
