import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/authService";
import { HttpUtils } from "../utils/httpUtils";
import { TokenService } from "../service/tokenService";

export class AuthController {
  private authService = new AuthService();
  constructor() {
    this.login = this.login.bind(this);
  }

  public async login(req: Request, res: Response, _next: NextFunction) {
    const { login, password } = req.body;
    if (!login || !password) {
      HttpUtils.badRequest(res, "Login ou senha não informados");
      return;
    }

    const user = await this.authService.login(login, password);
    if (!user) {
      HttpUtils.unauthorized(res, "Usuário não encontrado");
      return;
    }
    res.cookie("token", TokenService.generateToken(user.id), {
      httpOnly: true,
      maxAge: 3600000 * 24,
    });
    HttpUtils.ok(res, "Logado com sucesso");
  }
}
