import { Response } from "express";

export class HttpUtils {
  public static ok(res: any, message?: string, data?: any) {
    res.status(200).json({
      message: message,
      data,
    });
  }
  public static notFound(res: Response, message: string, data?: any) {
    res.status(404).json({ message, data });
  }
  public static created(res: any, message: string, data?: any) {
    res.status(201).json(message, data);
  }
  public static badRequest(res: any, message: string, data?: any) {
    res.status(400).json({ message, data });
  }
  public static unauthorized(res: any, message: string, data?: any) {
    res.status(401).json({ message, data });
  }
}
