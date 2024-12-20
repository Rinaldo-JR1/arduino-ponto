import { Employee, PrismaClient } from "@prisma/client";
import { EmployeeStatus } from "../shared/enums/employeeStatus";

export class EmployeeService {
  private prisma = new PrismaClient();

  public async register(name: string, tagId: string) {
    const checkTagId = await this.prisma.employee.findFirst({
      where: {
        tagId: tagId,
        status: EmployeeStatus.ACTIVE,
      },
    });
    if (checkTagId) {
      return { message: "Tag já existe" };
    }

    const created = await this.prisma.employee.create({
      data: {
        name: name,
        tagId: tagId,
      },
    });
    return { message: "Funcionario criado", created };
  }

  public async getRegisters() {
    return await this.prisma.employee.findMany();
  }
  public async inactiveEmployee(id: number) {
    return await this.prisma.employee.update({
      where: {
        id: id,
      },
      data: {
        status: EmployeeStatus.INACTIVE,
      },
    });
  }
}
