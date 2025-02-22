import { findByEmail, createUser } from "../repository/UserRepository";
import { comparePassword, hashPassword } from "../helpers/bcrypt";

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
}

export default UserService;
