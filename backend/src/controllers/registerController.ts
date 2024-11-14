import { NextFunction, Request, Response } from "express";
import { HttpUtils } from "../utils/httpUtils";
import { RegisterService } from "../service/registerService";
import { RegisterErrorTypes } from "../shared/enums/registerErrorTypes";

export class RegisterController {
  private registerService = new RegisterService();
  constructor() {
    this.register = this.register.bind(this);
    this.getRegisters = this.getRegisters.bind(this);
  }
  public async register(req: Request, res: Response, _next: NextFunction) {
    const { uid } = req.body;
    console.log(uid);
    if (!uid) {
      HttpUtils.notFound(res, "TagId not found");
    }
    const registerStatus = await this.registerService.register(uid);
    if (registerStatus === RegisterErrorTypes.NOTFOUND) {
      HttpUtils.notFound(res, "TagId not found");
      return;
    }
    HttpUtils.ok(res, registerStatus);
    return;
  }
  public async getRegisters(req: Request, res: Response, _next: NextFunction) {
    const registers = await this.registerService.getRegisters();
    if (!registers) {
      HttpUtils.notFound(res, "Registers not found");
      return;
    }
    HttpUtils.ok(res, "Registers found", registers);
  }
}
