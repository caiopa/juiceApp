import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod";

import { registerSchema } from "../schemas/schemas";


export function validateRegister(req: Request, res: Response, next: NextFunction) {
  try {
    const validateUser = registerSchema.parse(req.body);
    
    return next();
  } catch (e: any) {
    if (e instanceof ZodError) {
      res.status(400).json({ message: e.errors[0].message });
    } else {
      next(e);
    }
   
  }
}



