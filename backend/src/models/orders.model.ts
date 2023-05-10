import { Schema, isValidObjectId } from 'mongoose';
import { number } from 'zod';
import { IQuery, IProduct } from '../interfaces';
import { ordersSchema, productSchema } from "../schemas/schemas";
import AbstractODM from './abstractODM';

class OrderODM extends AbstractODM<ordersSchema> {
  constructor() {
    const schema = new Schema({
      comprador: { type: String, required: true },
      sabor: { type: String, required: true },
      preco: { type: Number, required: true, },
      qnt: { type: Number, required: true},
      tamanho: { type: String, required: true },
      descricao: { type: String, required: false},
      total: { type: Number, required: false}
    }, { timestamps: true });

    super(schema, 'Orders');
 }
    

  public async create(body: any): Promise<any> {
    return this.model.create({...body});
  }


}

export default OrderODM;