import { Router } from "express";

import { EmployeeController } from "../controllers/employeeController";

const employeeRoutes = Router();
const employeeController = new EmployeeController();

employeeRoutes.get("/", employeeController.getEmployee);
employeeRoutes.post("/create", employeeController.createEmployee);
employeeRoutes.put("/inactive/:id", employeeController.inactiveEmployee);
export { employeeRoutes };
