import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller';
import { validateUser } from '../middlewares/login.middleware';


const userController = new UserController();

const loginRouter = Router();


loginRouter.post('/', validateUser, (req: Request, res: Response, next: NextFunction) => userController.login(req, res, next))




export default loginRouter;