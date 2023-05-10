import { IProduct } from "../interfaces";
import Product from '../domains/products.domain'
import ProductODM from "../models/products.model";
import { productSchema } from "../schemas/schemas";

class ProductsService {

    public async create(product: productSchema) {
      const productODM = new ProductODM();
      const productCreated = await productODM.create(product);
      return productCreated
    }

    public async getAll() {
      const productODM = new ProductODM();
      const products = await productODM.getAll()
      const arrayProducts = products.map((product: productSchema) => product);
      return arrayProducts
    }

    public async getById(id: string) {
        const productODM = new ProductODM();
        const products = await productODM.getById(id)
        if(!products) throw {status: 404, message: "Product not found"}
        return products
    }


    public async update(body: IProduct, id: string) {
      const productODM = new ProductODM();
      const productUpdated = await productODM.update(body, id)

      return productUpdated
    }

    public async delete(id: string) {
        const productODM = new ProductODM();
        const produtDeleted = await productODM.delete(id)
        return produtDeleted
    }
}

export default ProductsService;