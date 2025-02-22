import { Request, Response, NextFunction } from "express";

const authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (res.locals.loginSession.role !== "admin") throw { name: "Forbidden" };

    next();
  } catch (error) {
    next(error);
  }
}

export default authorization;