import type { Response } from "express";

export function sendResponse<T>(
  res: Response,
  status: number,
  type: "success" | "fail",
  message: string,
  data?: T
) {
  return res.status(status).json({
    type,
    message,
    // si 1ere partie est true renvoie la seconde data : data
    ...(data !== undefined && { data })
  });
}
