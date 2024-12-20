import { PrismaClient } from "@prisma/client";
import { RegisterErrorTypes } from "../shared/enums/registerErrorTypes";
import { RegisterTypes } from "../shared/enums/registerTypes";
import { EmployeeStatus } from "../shared/enums/employeeStatus";

export class RegisterService {
  private prisma = new PrismaClient();

  public async getRegisterByTagId(tagId: string) {
    return await this.prisma.employee.findFirst({
      where: {
        tagId: tagId,
        status: EmployeeStatus.ACTIVE,
      },
    });
  }
  public async getRegisters() {
    return await this.prisma.dailyRegister.findMany({
      include: {
        employee: true,
      },
    });
  }

  public async register(tagId: string) {
    const foundUser = await this.getRegisterByTagId(tagId);
    //Verify if exists
    if (!foundUser) {
      return RegisterErrorTypes.NOTFOUND;
    }
    //Check last register
    const lastRegister = await this.prisma.dailyRegister.findFirst({
      where: {
        employeeId: foundUser.id,
      },
      orderBy: {
        date: "desc",
      },
    });
    if (!lastRegister || lastRegister.type === RegisterTypes.EXIT) {
      await this.prisma.dailyRegister.create({
        data: {
          employeeId: foundUser.id,
          type: RegisterTypes.ENTRY,
        },
      });
    }
    if (lastRegister?.type === RegisterTypes.ENTRY) {
      await this.prisma.dailyRegister.create({
        data: {
          employeeId: foundUser.id,
          type: RegisterTypes.EXIT,
        },
      });
    }
    return RegisterErrorTypes.GENERATED;
  }
}
