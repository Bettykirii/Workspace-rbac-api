import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env";

export function signAccessToken(payload: object) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

// store hashed refresh token in DB (never raw)
export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}