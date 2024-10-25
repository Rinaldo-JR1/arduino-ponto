import { Router } from "express";
import { RegisterController } from "../controllers/registerController";

const registerRoutes = Router();
const registerController = new RegisterController();

registerRoutes.post("/register/:tagId", registerController.register);

export { registerRoutes };
