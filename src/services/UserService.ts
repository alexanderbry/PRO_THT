import { findByEmail, createUser } from "../repository/UserRepository";
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
      }
      
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
}

export default UserService;
