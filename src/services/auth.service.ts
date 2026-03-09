import bcrypt from "bcrypt";
import { User } from "../models/User";
import { RefreshToken } from "../models/RefreshToken";
import { signAccessToken, signRefreshToken, hashToken } from "../utils/tokens";

export class AuthService {
  static async register(email: string, password: string) {
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error("EMAIL_IN_USE");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashed });

    return { id: user.id, email: user.email };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("INVALID_CREDENTIALS");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("INVALID_CREDENTIALS");

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);

    // store hashed refresh token
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await RefreshToken.create({ userId: user.id, tokenHash, expiresAt });

    return { accessToken, refreshToken };
  }
}