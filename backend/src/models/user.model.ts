import { Schema, isValidObjectId } from 'mongoose';
import { FindBy, IQuery, IUser } from '../interfaces';
import AbstractODM from './abstractODM';
import { registerSchema } from '../schemas/schemas';


class UserODM extends AbstractODM<IUser> {
  constructor() {
    const schema = new Schema({
      name: { type: String, required: false },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    }, { timestamps: true });

    super(schema, 'User');
}
    

  public async findOne(query: IQuery): Promise<IUser | null> {

    return this.model.findOne(query).exec();
  }

  public async create(body: IUser): Promise<any> {
    return this.model.create({...body});
  }

  public async getAll() {
    return this.model.find()

  }

  public async getById(id: string): Promise<any> {
    if(!isValidObjectId(id)) throw {status: 422, message: "Invalid mongo id"};
    return this.model.findById(id)
  }

  async insertManyProducts(user: any) {
    return this.model.insertMany(user);
  }

  async countProducts() {
    const count = await this.model.countDocuments();
    return count;
  }
}

export default UserODM;