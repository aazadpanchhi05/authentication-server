import { Response } from "express";

export const message = (
  res: Response,
  message: string,
  status: number,
  data?: unknown
) => {
  const response = {
    message,
    status,
  };

  return res.status(status).json({
    response: data ? { ...response, data } : response,
  });
};
