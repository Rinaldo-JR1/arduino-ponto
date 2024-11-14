import { api } from "@/src/config/api";
import { EmployeeForm } from "@/src/shared/types/Forms/EmployeeForm";
import { CreateEmployeeResponse } from "@/src/shared/types/response/CreateEmployee";
import { GetEmployee } from "@/src/shared/types/response/GetEmployee";
import { InactiveEmployeeResponse } from "@/src/shared/types/response/inactiveEmloyee";

export class EmployeeService {
  static async getEmployees() {
    return await api.get<GetEmployee>("/employee");
  }
  static async createEmployee(form: EmployeeForm) {
    return await api.post<CreateEmployeeResponse>("/employee/create", {
      name: form.name,
      tagId: form.tagId,
    });
  }
  static async inactive(employeeId: number) {
    return await api.put<InactiveEmployeeResponse>(
      `/employee/inactive/${employeeId}`
    );
  }
}
