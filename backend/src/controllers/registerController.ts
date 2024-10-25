import { NextFunction, Request, Response } from "express";
import { HttpUtils } from "../utils/httpUtils";
import { RegisterService } from "../service/registerService";
import { RegisterErrorTypes } from "../shared/enums/registerErrorTypes";

export class RegisterController {
  public async register(req: Request, res: Response, _next: NextFunction) {
    const registerService = new RegisterService();

    const { tagId } = req.params;
    if (!tagId) {
      HttpUtils.notFound(res, "TagId not found");
    }
    const registerStatus = await registerService.register(tagId);
    if (registerStatus === RegisterErrorTypes.NOTFOUND) {
      HttpUtils.notFound(res, "TagId not found");
      return;
    }
    HttpUtils.ok(res, registerStatus);
    return;
  }
}
