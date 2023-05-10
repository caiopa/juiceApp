import { Schema, isValidObjectId } from 'mongoose';
import { IQuery, IProduct } from '../interfaces';
import { productSchema } from "../schemas/schemas";
import AbstractODM from './abstractODM';

class ProductODM extends AbstractODM<productSchema> {
  constructor() {
    const schema = new Schema({
      sabor: { type: String, required: true },
      price: { type: Number, required: true, unique: false },
      description: { type: String, required: false, unique: false}
    }, { timestamps: true });

    super(schema, 'Product');
 }
    

  public async create(body: productSchema): Promise<any> {
    const isNewProduct = await this.model.findOne({ sabor: body.sabor })
    if(!!isNewProduct) {
      throw {status: 400, message: 'Product already exists'}
    }
    
      return await this.model.create({...body})
    
  }

  async insertManyProducts(products: productSchema[]) {
    return this.model.insertMany(products);
  }

  async deleteMany() {
    return this.model.deleteMany()
  }

  async countProducts() {
    const count = await this.model.countDocuments();
    return count;
  }

  public async getAll() {
    return this.model.find()
  }

  public async update(body: IProduct, id: string): Promise<any> {
    if (!isValidObjectId(id)) throw {status: 422, message: "Invalid mongo id"};
    const updated = this.model.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
    console.log(updated) 
    return updated;
  }

  public async getById(id: string): Promise<IProduct | null> {
    if(!isValidObjectId(id)) throw {status: 422, message: "Invalid mongo id"};
    return this.model.findById(id)

  }

  public async delete(id: string) {
    if(!isValidObjectId(id)) throw {status: 422, message: "Invalid mongo id"};
    return this.model.findByIdAndRemove(id)
  }

}

export default ProductODM;