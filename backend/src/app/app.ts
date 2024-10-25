import express, { NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { registerRoutes } from "../routes/register.routes";

class App {
  private app: express.Application;
  private port: number;
  private baseUrl = "/ponto-api";

  constructor(port: number) {
    this.app = express();
    this.port = port;
    const corsOptions: CorsOptions = {
      origin: "*",
    };
    this.app.use(cors(corsOptions));
    this.app.use(express.json());

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`Ip: ${req.ip} || Request: ${req.method} ${req.path}`);
      next();
    });
    this.app.use(`${this.baseUrl}/register`, registerRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export { App };
