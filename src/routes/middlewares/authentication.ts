import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../helpers/jsonwebtoken";
import { findById } from "../../repository/UserRepository";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) throw { name: "Unauthorized" };

    const [bearer, token] = req.headers.authorization.split(" ");
    if (!token) throw { name: "Unauthorized" };

    const data = await verifyToken(token);
    if (typeof data === "string" || !data.id) throw { name: "Unauthorized" };

    const user = await findById(data.id);
    if (!user) throw { name: "Unauthorized" };

    res.locals.loginSession = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authentication;
