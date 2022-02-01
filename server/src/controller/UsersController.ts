import {getRepository, getConnection} from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as cookieParser from "cookie-parser";

import {NextFunction, Request, Response} from "express";
import {Users} from "../entity/Users";

export class UsersController {

    private usersRepository = getRepository(Users);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.usersRepository.find();
    }

    async one (request: Request, response: Response, next: NextFunction) {
        return this.usersRepository.findOne(request.params.email);
    }

    async save (request: Request, response: Response, next: NextFunction) {
        try{
            const {email, password} = request.body;
            console.log(email, password);
            const candidate = this.usersRepository.findOne({ email: email });
            
            if(candidate){
               return response.status(400).json({message:'Такой пользователь уже существует'})
            };
            console.log('Пользователь не найден, будем создавать');
            const hashedPassword = await bcrypt.hash(password, 12);
            
            const newUser = new Users();
            newUser.email = email;
            newUser.password=hashedPassword;
            console.log(newUser);

            this.usersRepository.save(newUser);
            return  response.status(201).json({message:"Пользователь создан"});
    
        } catch(err){
            return response.status(500).json({message:'Что-то пошло не так, попробуйте еще раз'})
        }
    }
    async login (request: Request, response: Response, next: NextFunction) {
        
        try{
            const {email, password} = request.body;
            console.log(email, password);
            const user = await this.usersRepository.findOne({ email: email });
            console.log(user);

            if(!user){
                return response.status(400).json({message:'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password, user.password);
            
            if(!isMatch){
                return response.status(400).json({message:'Неверный пароль'})
            }
            console.log("Пользователь найден");
            
            const payload ={
                userEmail: user.email,
                userId: user.id
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET);
            console.log(token);

            const payloadOptions ={
                maxAge: 3000,
                sameSite: true,
                httpOnly: true
            }
            
            return response
            .cookie("access_token", token, payloadOptions)
            .status(200)
            .json({message:"Logged is successfully"});
    
        } catch(err){
            return response.status(500).json({message:'Что-то пошло не так, попробуйте еще раз'})
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.usersRepository.findOne(request.params.id);
        await this.usersRepository.remove(userToRemove);

    }
}