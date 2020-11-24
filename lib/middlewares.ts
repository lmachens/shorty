import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // It's important to add `next` as argument, otherwise Express will not detect this as error handler
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  console.error(err.stack);
  if (!res.headersSent) {
    res.status(500);
  }
  res.send(err.message);
};
