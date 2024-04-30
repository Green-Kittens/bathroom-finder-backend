import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || "",
  workosApiKey: process.env.WORKOS_API_KEY || "",
  workosClientId: process.env.WORKOS_CLIENT_ID || "",
  workosCookiePassword: process.env.WORKOS_COOKIE_PASSWORD || "",
};
