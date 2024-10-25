import { Router } from "express";
import { RegisterController } from "../controllers/registerController";

const registerRoutes = Router();
const registerController = new RegisterController();

registerRoutes.post("/:tagId", registerController.register);

export { registerRoutes };
