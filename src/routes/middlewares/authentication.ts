import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../helpers/jsonwebtoken";
import { findById } from "../../repository/UserRepository";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.headers.authorization, "ini authorization");
    if (!req.headers.authorization) throw { name: "Unauthorized" };

    const [bearer, token] = req.headers.authorization.split(" ");
    console.log(token, "ini token");
    if (!token) throw { name: "Unauthorized" };

    const data = await verifyToken(token);
    console.log(data, "ini data");
    if (typeof data === "string" || !data.id) throw { name: "Unauthorized" };

    const user = await findById(data.id);
    console.log(user, "ini user");
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
