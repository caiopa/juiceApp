import UserService from '../services/user.service';
import { NextFunction, Request, Response } from 'express';

class UserController {
  private service: UserService;
  constructor() {
    this.service = new UserService();
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    
    try {
        const token = await this.service.login(req.body)
        return res.status(200).json(token)
    } catch (e) {
        next(e)
    } 
  }
  
  public async create(req: Request, res: Response, next: NextFunction) {
    try { 
        const newUser = await this.service.create(req.body)
        return res.status(201).json(newUser)
        
    } catch (error) {
        next(error)
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.service.getAll()
      return res.status(200).json(users)
      
    } catch (error) {
      next(error)
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
      const user = await this.service.getById(id)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController;