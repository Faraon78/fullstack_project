import { getRepository, getConnection } from 'typeorm';

import { NextFunction, Request, Response } from 'express';
import { Users } from '../entity/Users';
import { UsersService } from '../service/UsersService';
import { access } from 'fs';

export class UsersController {
    private usersRepository = getRepository(Users);
    UserServiceInstance = new UsersService();

    //Find all users
    async findAllUsers(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const users = await this.UserServiceInstance.findAllUsersDB();
            return users;
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, try again' });
        }
    }

    //Find one user by id
    async findOneUser(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const id = +request.params.id;
        try {
            return this.UserServiceInstance.findOneUserDB(id);
        } catch (err) {}
    }

    //New User Registration
    async saveUser(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = request.body;

            await this.UserServiceInstance.saveUserDB(email, password);

            return response.status(201).json({ message: 'User created' });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, try again' });
        }
    }

    // Login
    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = request.body;
            const userResponse = await this.UserServiceInstance.loginDB(
                email,
                password
            );

            const { token, userId } = userResponse;

            return response.status(200).json({
                token: token,
                userId: userId,
                message: 'Logged is successfully',
            });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, try again' });
        }
    }

    async updateUser(request: Request, response: Response, next: NextFunction) {
        try {
            await this.UserServiceInstance.updateUserDB(request);
            return response.status(201).json({ message: 'User updated' });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, try again' });
        }
    }
}
