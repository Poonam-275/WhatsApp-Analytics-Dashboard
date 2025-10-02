import dotenv from 'dotenv';

dotenv.config();

export interface AppEnv {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  redis: {
    host: string;
    port: number;
  };
}

export function loadEnv(): AppEnv {
  return {
    port: Number(process.env.BACKEND_PORT || 3000),
    jwtSecret: process.env.JWT_SECRET || 'dev-secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      name: process.env.DB_NAME || 'whatsapp_analytics',
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT || 6379),
    },
  };
}
