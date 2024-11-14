import { api } from "@/src/config/api";
import { registerFilters } from "@/src/shared/types/registerFilters";
import { GetRegisters } from "@/src/shared/types/response/GetRegisters";

export class RegisterService {
  async getRegisters(filters?: registerFilters) {
    return await api.get<GetRegisters>("/register/registers");
  }
}
