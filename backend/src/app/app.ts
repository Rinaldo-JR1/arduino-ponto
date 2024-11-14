import express, { NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { registerRoutes } from "../routes/register.routes";
import { employeeRoutes } from "../routes/employee.routes";
import cookieParser from "cookie-parser";
import { authRoutes } from "../routes/auth.routes";

class App {
  private app: express.Application;
  private port: number;
  private baseUrl = "/ponto-api";

  constructor(port: number) {
    this.app = express();
    this.port = port;
    // const corsOptions: CorsOptions = {
    //   origin: ["http://localhost:3000", "http://localhost:3001", "*"],
    // };
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`Ip: ${req.ip} || Request: ${req.method} ${req.path}`);
      next();
    });
    this.app.use(`${this.baseUrl}/register`, registerRoutes);
    this.app.use(`${this.baseUrl}/employee`, employeeRoutes);
    this.app.use(`${this.baseUrl}/auth`, authRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export { App };
