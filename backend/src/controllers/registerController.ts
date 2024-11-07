import { NextFunction, Request, Response } from "express";
import { HttpUtils } from "../utils/httpUtils";
import { RegisterService } from "../service/registerService";
import { RegisterErrorTypes } from "../shared/enums/registerErrorTypes";

export class RegisterController {
  public async register(req: Request, res: Response, _next: NextFunction) {
    const registerService = new RegisterService();

    // const { tagId } = req.params;
    const { uid } = req.body;
    console.log(uid);
    if (!uid) {
      HttpUtils.notFound(res, "TagId not found");
    }
    const registerStatus = await registerService.register(uid);
    if (registerStatus === RegisterErrorTypes.NOTFOUND) {
      HttpUtils.notFound(res, "TagId not found");
      return;
    }
    HttpUtils.ok(res, registerStatus);
    return;
  }
}
