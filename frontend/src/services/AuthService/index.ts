import { api } from "@/src/config/api";
import { LoginResponse } from "@/src/shared/types/response/Login";

export class AuthService {
  public static async login(login: string, password: string) {
    return await api.post<LoginResponse>("/auth/login", { login, password });
  }
}
