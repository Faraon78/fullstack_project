import * as jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

const authorization = (request: Request, response: Response, next: NextFunction) =>{
    
        const tokenHeader = request.headers["authorization"];

        const tokenPayloadCookie = request.cookies["payload"];
        const tokenSignatureCookie = request.cookies["signature"];

        let tokenStr = null;

        if(tokenPayloadCookie  && tokenSignatureCookie){
            tokenStr = `${tokenPayloadCookie}.${tokenSignatureCookie}`;

        } else if (tokenHeader){
            const arrayHeader = tokenHeader.split(" ");

            if(arrayHeader[0]==="Bearer"){
                return response.status(401).send("invalid token");
            } else {
                tokenStr = arrayHeader[1];
            }
        }
        if(!tokenStr){
            return response.status(401).send("Error: access denied");

        } else { 
            jwt.verify(tokenStr, process.env.JWT_SECRET, (error:any) =>{
                if(error){
                    console.log(`JWT Error: ${error}`);
                    return response.status(401).send("Error: access denied")
                }
                const payloadOptions ={
                    maxAge: 1000 * 60,
                    sameSite: true,
                    //secure: true
                }

                response.cookie("payload", tokenPayloadCookie, payloadOptions)
            })
        }
    }
