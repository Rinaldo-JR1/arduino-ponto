import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "../service/employeeService";
import { HttpUtils } from "../utils/httpUtils";

export class EmployeeController {
  private employeeService = new EmployeeService();

  constructor() {
    this.createEmployee = this.createEmployee.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.inactiveEmployee = this.inactiveEmployee.bind(this);
  }

  public async createEmployee(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { name, tagId } = req.body;
    if (!name || !tagId) {
      HttpUtils.badRequest(res, "Nome não informado");
      return;
    }
    if (!tagId) {
      HttpUtils.badRequest(res, "Id da tag não informado");
      return;
    }

    const resText = await this.employeeService.register(name, tagId);
    HttpUtils.ok(res, resText);
  }

  public async getEmployee(req: Request, res: Response, _next: NextFunction) {
    const employees = await this.employeeService.getRegisters();
    if (employees.length >= 1) {
      HttpUtils.ok(res, "Funcionários encontrados", employees);
      return;
    }
    HttpUtils.notFound(res, "Não foi encontrado nenhum funcionário", employees);
  }
  public async inactiveEmployee(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { id } = req.params;
    if (!id) {
      HttpUtils.badRequest(res, "Nenhum Id foi informado");
      return;
    }
    const employee = await this.employeeService.inactiveEmployee(parseInt(id));
    HttpUtils.ok(res, "Funcionário inativado", employee);
  }
}
