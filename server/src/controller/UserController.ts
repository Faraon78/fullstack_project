import { getRepository, getConnection } from 'typeorm';

import { NextFunction, Request, Response } from 'express';
import { Chatuser } from '../entity/Chatuser';
import { UserService } from '../service/UserService';
import { PostService } from '../service/PostService';
import { access } from 'fs';

export class UserController {
    private userRepository = getRepository(Chatuser);
    UserServiceInstance = new UserService();
    PostServiceInstance = new PostService();

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
        const id: number = +request.params.id;
        try {
            return this.UserServiceInstance.findOneUserDB(id);
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, try again' });
        }
    }

    //New User Registration
    async saveUser(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, userName, password } = request.body;

            const user = await this.UserServiceInstance.saveUserDB(
                email,
                userName,
                password
            );

            if (!user) {
                return response
                    .status(401)
                    .json({ message: 'Such user already exsists' });
            }
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
            if (userResponse == 1) {
                return response
                    .status(401)
                    .json({ message: 'User is not found' });
            } else if (userResponse == 2) {
                return response
                    .status(401)
                    .json({ message: 'Invalid password' });
            } else {
                const { token, userId } = userResponse;

                return response.status(200).json({
                    token: token,
                    userId: userId,
                    message: 'Logged is successfully',
                });
            }
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
