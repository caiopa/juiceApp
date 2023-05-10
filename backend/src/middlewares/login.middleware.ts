import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod";

import { loginSchema } from "../schemas/schemas";


export function validateUser(req: Request, res: Response, next: NextFunction) {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (e: any) {
    if (e instanceof ZodError) {
      if (e.errors && e.errors[0] && e.errors[0].message === undefined) {
        res.status(500).json({ message: "Erro interno" });
      } else {
        res.status(400).json({ message: e.errors[0].message });
      }
    } else {
      next(e);
    }
   
  }
}



