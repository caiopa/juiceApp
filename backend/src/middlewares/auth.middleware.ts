import { Request, Response, NextFunction } from "express";

import  { validateToken } from '../utils/JWT';



const JWT = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: 'Token was not found' });
  }
  
  try {
    const decoded = validateToken(authorization);
    res.locals.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token must be a valid one' });
  }
};

export default JWT