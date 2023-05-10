import { Router, Request, Response, NextFunction } from 'express';
import OrdersController from '../controllers/order.controller';
import { validateUser } from '../middlewares/login.middleware';


const ordersController = new OrdersController();

const ordersRouter = Router();


ordersRouter.post('/', (req: Request, res: Response, next: NextFunction) => ordersController.create(req, res, next))




export default ordersRouter;