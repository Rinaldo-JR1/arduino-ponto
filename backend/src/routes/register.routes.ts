import { Router } from "express";
import { RegisterController } from "../controllers/registerController";
import { VerifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

const registerRoutes = Router();
const registerController = new RegisterController();

registerRoutes.post("/", registerController.register);
registerRoutes.get(
  "/registers",
  VerifyTokenMiddleware.verifyToken,
  registerController.getRegisters
);

export { registerRoutes };
