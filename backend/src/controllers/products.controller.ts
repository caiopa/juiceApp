import ProductsService from '../services/products.service';
import { NextFunction, Request, Response } from 'express';

class ProductsController {
  private service: ProductsService;
  constructor() {
    this.service = new ProductsService();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try { 
        const newProduct = await this.service.create(req.body)
        return res.status(201).json(newProduct)
        
    } catch (error) {
        next(error)
    }

  }
  
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const allProducts = await this.service.getAll()
        return res.status(200).json(allProducts)
    } catch (error) {
        next(error)
    }
   
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await this.service.getById(id);
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }

  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        const updated = await this.service.update(req.body, id)
        return res.status(201).json(updated)
    } catch (error) {
        next(error)
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const deleted = await this.service.delete(id)
      return res.status(200).json("deleted")
    } catch (e) {
      next(e)
    }
  }
}

export default ProductsController;