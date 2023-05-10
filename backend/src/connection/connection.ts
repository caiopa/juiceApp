import mongoose, { ConnectOptions, Schema } from 'mongoose';
import fs from 'fs';
import { productSchema, registerSchema } from '../schemas/schemas';
import products from '../json/products.json'
import ProductODM from '../models/products.model';
import UserODM from '../models/user.model';
import users from '../json/users.json'

const MONGO_DB_URL = 'mongodb://localhost:27017/myapp';

const connectToDatabase = (
    mongoDatabaseURI = process.env.MONGO_URL
      || MONGO_DB_URL,
  ) => mongoose.connect(mongoDatabaseURI);

  const productODM = new ProductODM;

  productODM.countProducts().then(count => {
  if (count === 0) {
    productODM.insertManyProducts(products)
    .then(() => console.log('Documentos inseridos com sucesso!'))
    .catch((err) => console.error(err))
  } else {
    console.log('Já existem documentos na coleção Product, não é necessário inserir novamente.');
  }
})
.catch((err) => console.error(err))

const userODM = new UserODM;

userODM.countProducts().then(count => {
  if (count === 0) {
    userODM.insertManyProducts(users)
    .then(() => console.log('Usuario inseridos com sucesso!'))
    .catch((err) => console.error(err))
  } else {
    console.log('Já existem documentos na coleção Usuario, não é necessário inserir novamente.');
  }
})
.catch((err) => console.error(err))
  
// productODM.deleteMany()
// .then(() => console.log('Todos os documentos da coleção Product foram deletados com sucesso!'))
// .catch((err) => console.error(err))

export default connectToDatabase