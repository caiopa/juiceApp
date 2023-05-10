import {IProduct} from '../interfaces';

class Product { 
  private name: string | undefined;
  private description: string | undefined;

  constructor(obj: IProduct) {
    this.name = obj.name;
    this.description = obj.description;
  }
}

export default Product;