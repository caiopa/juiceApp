import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod";

import { productSchema } from "../schemas/schemas";


export function validateProduct (req: Request, res: Response, next: NextFunction) {
  try {
    productSchema.parse(req.body);
    return next();
  } catch (e: any) {
    if (e instanceof ZodError) {
      res.status(400).json({ message: e.errors[0].message });
    } else {    
      next(e);
    }
   
  }
}



