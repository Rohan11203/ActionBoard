import { NextFunction, Request, Response, RequestHandler  } from "express";
import jwt, { decode, JwtPayload } from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET!;


export function Userauth(req: any, res: any, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }
  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded as JwtPayload;
    next();
  });
}
