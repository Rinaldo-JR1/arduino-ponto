import jwt from "jsonwebtoken";
import { secret } from "../utils/consts";

export class TokenService {
  public static generateToken(userId: number): string {
    const payload = { id: userId };
    return jwt.sign(payload, secret, { expiresIn: "6h" });
  }
}
