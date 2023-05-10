import { Router, Request, Response, NextFunction } from 'express';
import ProductsController from '../controllers/products.controller';
import { validateProduct } from '../middlewares/product.middleware';


const productsController = new ProductsController();

const productsRouter = Router();


productsRouter.post('/', validateProduct, (req: Request, res: Response, next: NextFunction) => productsController.create(req, res, next))

productsRouter.get('/', (req: Request, res: Response, next: NextFunction) => productsController.getAll(req, res, next))

productsRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => productsController.getById(req, res, next))

productsRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => productsController.update(req, res, next))

productsRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => productsController.delete(req, res, next))




export default productsRouter;