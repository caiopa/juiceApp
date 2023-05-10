import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller';
import { validateRegister } from '../middlewares/register.middleware';


const userController = new UserController();

const registerRouter = Router();


registerRouter.post('/', validateRegister, (req: Request, res: Response, next: NextFunction) => userController.create(req, res, next))




export default registerRouter;