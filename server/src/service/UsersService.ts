import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
const cloudinary = require('cloudinary').v2;

import { Users } from '../entity/Users';

export class UsersService {
    private usersRepository = getRepository(Users);

    async findAllUsersDB() {
        try {
            return this.usersRepository.find();
        } catch (err) {
            return err;
        }
    }

    async findOneUserDB(id: number) {
        try {
            return this.usersRepository.findOne({ id: id });
        } catch (err) {
            return err;
        }
    }

    async saveUserDB(email: string, password: string) {
        try {
            //check if there is such a user
            const candidate = await this.usersRepository.findOne({
                email: email,
            });

            if (candidate) {
                throw new Error('This user already exists');
            }
            //encrypt the password
            const hashedPassword = await bcrypt.hash(password, 12);

            //create a new User
            const newUser = new Users();
            newUser.email = email;
            newUser.password = hashedPassword;

            // save new user
            return this.usersRepository.save(newUser);
        } catch (err) {
            return err;
        }
    }

    async loginDB(email: string, password: string) {
        try {
            // find user in the database by email
            const user = await this.usersRepository.findOne({ email: email });

            if (!user) {
                throw new Error('User is not found');
            }
            // check if the password is correct
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error('Invalid password');
            }

            // create a token
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            const userId = user.id;
            return { token: token, userId: userId };
        } catch (err) {
            return err;
        }
    }
    async updateUserDB(request: any) {
        try {
            const {
                id,
                userName,
                realName,
                company,
                website,
                phone,
                address,
                avatar,
            } = request.body;
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });

            //find the right user
            const candidate = await this.usersRepository.findOne({
                id: id,
            });
            // save image to cloudinary
            if (avatar.data) {
                const uploadedResponse = await cloudinary.uploader.upload(
                    avatar.data,
                    {
                        upload_preset: 'upload',
                    }
                );
                candidate.avatar = uploadedResponse.url;
            }

            candidate.userName = userName;
            candidate.realName = realName;
            candidate.company = company;
            candidate.website = website;
            candidate.phone = phone;
            candidate.address = address;

            // save user changes
            this.usersRepository.save(candidate);
        } catch (err) {
            return err;
        }
    }
}
