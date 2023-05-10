import {IUser} from '../interfaces';

class User { 
  private name: string | undefined;
  private email: string;
  private password: string;
  private role: string | undefined;

  constructor(obj: IUser) {
    this.name = obj.name;
    this.email = obj.email;
    this.role = obj.role;
    this.password = obj.password;
  }
}

export default User;