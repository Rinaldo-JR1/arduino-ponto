import { Response } from "express";

export class HttpUtils {
  public static ok(res: any, data: any) {
    res.status(200).json(data);
  }
  public static notFound(res: Response, message: string) {
    res.status(404).json({ message });
  }
  public static created(res: any, data: any) {
    res.status(201).json(data);
  }
}
