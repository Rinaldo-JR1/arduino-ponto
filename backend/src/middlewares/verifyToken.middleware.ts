import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { secret } from "../utils/consts";

export class VerifyTokenMiddleware {
  public static verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Token not found" });
      return;
    }

    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }

      req.body.userId = decoded.id;
      next();
    });
  }
}
