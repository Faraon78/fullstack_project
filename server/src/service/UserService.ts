import { getRepository, createQueryBuilder } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { Chatuser } from '../entity/Chatuser';
import { Post } from '../entity/Post';
import { response } from 'express';

export class UserService {
    private userRepository = getRepository(Chatuser);
    private postRepository = getRepository(Post);

    async findAllUsersDB() {
        try {
            return this.userRepository.find();
        } catch (err) {
            return err;
        }
    }

    async findOneUserDB(id: number) {
        try {
            return this.userRepository.findOne({ id });
        } catch (err) {
            return err;
        }
    }

    async saveUserDB(email: string, password: string) {
        try {
            //check if there is such a user
            const candidate = await this.userRepository.findOne({
                email,
            });

            if (candidate) {
                return false;
            }
            //encrypt the password
            const hashedPassword = await bcrypt.hash(password, 12);

            //create a new User
            const newUser = new Chatuser();
            newUser.email = email;
            newUser.password = hashedPassword;

            // save new user
            return this.userRepository.save(newUser);
        } catch (err) {
            return err;
        }
    }

    async loginDB(email: string, password: string) {
        try {
            // find user in the database by email
            const user = await this.userRepository.findOne({ email });

            if (!user) {
                console.log('User is not found');
                return 1;
            }
            // check if the password is correct
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return 2; //{message: 'Invalid password'};
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
            const candidate = await this.userRepository.findOne({
                id,
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
            this.userRepository.save(candidate);
        } catch (err) {
            return err;
        }
    }
    async findOneForPost(id: number) {
        try {
            console.log('запустили findOneForPost');
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect(
                    Post,
                    'post',
                    'public.post."userIdId"=chatuser.id'
                )
                .where('post.id=:id', { id: id })
                .printSql()
                .getOne();
            return user;
        } catch (err) {
            return err;
        }
    }
}
