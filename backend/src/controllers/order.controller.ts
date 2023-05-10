import OrdersService from '../services/orders.service';
import { NextFunction, Request, Response } from 'express';

class OrdersController {
  private service: OrdersService;
  constructor() {
    this.service = new OrdersService();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try { 
        const newOrder = await this.service.create(req.body)
        return res.status(201).json(newOrder)
        
    } catch (error) {
      console.error(error);

        next(error)
    }

  }
  
}

export default OrdersController;