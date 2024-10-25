import { NextFunction, Request, Response } from "express";
import { HttpUtils } from "../utils/httpUtils";

export class RegisterController {
  public register(req: Request, res: Response, _next: NextFunction) {
    const { tagId } = req.params;
    if (!tagId) {
      HttpUtils.notFound(res, "TagId not found");
    }
    HttpUtils.ok(res, { tagId });
    return;
  }
}
