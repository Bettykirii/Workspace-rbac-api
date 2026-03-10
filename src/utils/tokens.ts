import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env";

export function signAccessToken(userId: string) {
  return jwt.sign({ userId }, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(userId: string) {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}