import { Router } from "express";

import { EmployeeController } from "../controllers/employeeController";
import { VerifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

const employeeRoutes = Router();
const employeeController = new EmployeeController();

employeeRoutes.get(
  "/",
  VerifyTokenMiddleware.verifyToken,
  employeeController.getEmployee
);
employeeRoutes.post(
  "/create",
  VerifyTokenMiddleware.verifyToken,
  employeeController.createEmployee
);
employeeRoutes.put("/inactive/:id", employeeController.inactiveEmployee);
export { employeeRoutes };
