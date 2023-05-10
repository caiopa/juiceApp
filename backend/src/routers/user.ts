import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/user.controller';


const userController = new UserController();

const userRouter = Router();


userRouter.get('/', (req: Request, res: Response, next: NextFunction) => userController.getAll(req, res, next))

userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => userController.getById(req, res, next))




export default userRouter;