import {
  findByEmail,
  createUser,
  findAllUsers,
  findById,
  updateUser,
  deleteUser,
  findByIdAdmin,
} from "../repository/UserRepository";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { createToken } from "../helpers/jsonwebtoken";

class UserService {
  static async create(payload: any): Promise<any> {
    try {
      let { email, password, fullName, gender, dateOfBirth } = payload;

      const isUserExist = await findByEmail(email);
      if (isUserExist) throw { name: "EmailTaken" };

      const hashedPassword = await hashPassword(password);
      const newUser = {
        email,
        password: hashedPassword,
        fullName,
        gender,
        dateOfBirth,
      };

      const data = await createUser(newUser);

      return {
        status: 201,
        message: "User registered successfully",
        data: data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async login(payload: any): Promise<any> {
    try {
      let { email, password } = payload;

      const user = await findByEmail(email);
      if (!user) throw { name: "InvalidEmail/Password" };

      const isPasswordMatch = await comparePassword(password, user.password);
      if (!isPasswordMatch) throw { name: "InvalidEmail/Password" };

      const data = {
        id: user.id,
        role: user.role
      };

      const token = await createToken(data);

      return {
        status: 200,
        message: "User logged in successfully",
        data: token,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async adminLogin(payload: any): Promise<any> {
    try {
      let { id, password } = payload;

      const user = await findByIdAdmin(id);
      if (!user) throw { name: "InvalidEmail/Password" };

      const isPasswordMatch = await comparePassword(password, user.password);
      if (!isPasswordMatch) throw { name: "InvalidEmail/Password" };

      const data = {
        id: user.id,
        role: user.role
      };

      const token = await createToken(data);

      return {
        status: 200,
        message: "Admin logged in successfully",
        data: token,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
  


  static async getAllUsers(payload: any): Promise<any> {
    try {
      const { page, pageSize, search, sort } = payload;

      const data = await findAllUsers(page, pageSize, search, sort);
      if (data.length === 0) throw { name: "UsersEmpty" };

      return {
        status: 200,
        message: null,
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async getUserById(id: number): Promise<any> {
    try {
      const data = await findById(id);
      if (!data) throw { name: "UserNotFound" };

      return {
        status: 200,
        message: null,
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async updateUser(payload: any): Promise<any> {
    try {
      const { id, fullName, gender, dateOfBirth, createdAt } = payload;

      const user = await findById(id);
      if (!user) throw { name: "UserNotFound" };

      const data = await updateUser({
        id,
        fullName,
        gender,
        dateOfBirth,
        createdAt,
      });

      return {
        status: 200,
        message: null,
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async deleteUser(id: number): Promise<any> {
    try {
      const user = await findById(id);
      if (!user) throw { name: "UserNotFound" };

      await deleteUser(id);

      return {
        status: 200,
        message: "User deleted successfully",
        data: null,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

export default UserService;
