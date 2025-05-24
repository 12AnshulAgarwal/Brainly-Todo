import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  userId: string;
}
const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({
        message: "User not authenticated - No authorization header",
      });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.substring(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated - No token provided",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    if (!decode) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
    req.userId = decode.userId;
    next();
  } catch (err) {
    console.log("Authentication error:", err);
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default isAuthenticated;
