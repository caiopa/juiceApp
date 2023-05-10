import { IUser } from "../interfaces";

import  md5 from 'md5';
import User from '../domains/user.damain'
import { createToken } from '../utils/JWT';
import UserODM from "../models/user.model";
import { loginSchema, registerSchema } from "../schemas/schemas";

class UserService {
    private createUserDomain(user: IUser | null) {
        if(user) {
          return new User(user);
        }
        return null
    }

    public async login(body: loginSchema) {
      const userODM = new UserODM();
      const foundUser = await userODM.findOne({email: body.email})
      
      if(!foundUser) {
        const err = { status: 404, message:"Usuario não existe"}
        throw err
        }     
  
      const token = createToken(foundUser); 
 
      return {token, foundUser}
    }


    public async create(user: registerSchema) {
      const userODM = new UserODM();
      const { name, email, password } = user;
      const foundUser = await userODM.findOne({email})

      if(foundUser) {
        const err = { status: 409, message: 'User already exists' };
        throw err;
       }

       const userCreated = await userODM.create({ name, email, password: md5(password), role: "user" });
       
       const token = createToken(user);
       this.createUserDomain(await userCreated), token;
       return ({userCreated, token})
    }

    public async getAll() {
        const userODM = new UserODM();
        const users = await userODM.getAll()
        const arrayUsers = users.map((user: IUser) => user);
        return arrayUsers
    }

    public async getById(id: string) {
        const userODM = new UserODM();
        const user = await userODM.getById(id)
        return user
    }
}

export default UserService;