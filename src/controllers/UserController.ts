import { Request, Response, NextFunction } from "express";
import { UserSchema, LoginSchema } from "../schemas/UserSchema";
import UserService from "../services/UserService";

class UserController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { error, value } = UserSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
          data: null,
        });
      }

      const data = await UserService.create(value);
      if (data.error) throw data.error;

      return res.status(data.status).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { error, value } = LoginSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
          data: null,
        });
      }

      const data = await UserService.login(value);
      if (data.error) throw data.error;

      return res.status(data.status).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(
    req: Request, res: Response, next: NextFunction
  ): Promise<any> {
    try {
      const page = req.query.page ? +req.query.page : 0
      const pageSize = req.query.pageSize ? +req.query.pageSize : 20;

      const payload = { page, pageSize };

      const data = await UserService.getAllUsers(payload);
      if (data.error) throw data.error;

      return res.status(data.status).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
