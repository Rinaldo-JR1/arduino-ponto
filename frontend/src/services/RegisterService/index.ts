import { api } from "@/src/config/api";
import { GetRegisters } from "@/src/types/response/GetRegisters";

export class RegisterService {
  async getRegisters() {
    return await api.get<GetRegisters>("/register/registers");
  }
}
