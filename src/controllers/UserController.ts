import { Request, Response, NextFunction } from "express";
import { UserSchema, LoginSchema, UpdateSchema, AdminLoginSchema } from "../schemas/UserSchema";
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
  
  static async adminLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { error, value } = AdminLoginSchema.validate(req.body);
  
      if (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
          data: null,
        });
      }
  
      const data = await UserService.adminLogin(value);
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
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const page = req.query.page ? +req.query.page : 0;
      const pageSize = req.query.pageSize ? +req.query.pageSize : 20;
      const search = req.query.search ? req.query.search.toString() : '';
      const sort = req.query.sort ? req.query.sort.toString() : 'asc';

      
      const payload = { page, pageSize, search, sort };

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

  static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const id = +req.params.id;

      const data = await UserService.getUserById(id);
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

  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const id = +req.params.id;

      const { error, value } = UpdateSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
          data: null,
        });
      }

      const payload = { ...value, id };

      const data = await UserService.updateUser(payload);
      if(data.error) throw data.error;

      return res.status(data.status).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const id = +req.params.id;

      const data = await UserService.deleteUser(id);
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
