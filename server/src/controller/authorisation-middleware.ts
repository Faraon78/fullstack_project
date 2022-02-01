import * as jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

const authorization = (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies.access_token;
    if (!token) {
      return  response.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
     /* request.userId = data.userId;
      request.email = data.userEmail;
      console.log("работает authorization");*/
      return next();
    } catch {
      return  response.sendStatus(403);
    }
  };