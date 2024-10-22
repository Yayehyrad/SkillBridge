import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

 

const verifyToken = (token: string, secretKey: string): any => {
  return jwt.verify(token, secretKey);
};

const authenticate = (req: any , res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader, "authHeader");

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token, "JWT_SECRET");

    req.user = payload;

    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authenticate;
