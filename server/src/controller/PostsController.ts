import { NextFunction, Request, Response } from 'express';
import { PostsService } from '../service/PostsService';
export class PostsController {
    PostServiceInstance = new PostsService();

    async findAllPosts(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        return this.PostServiceInstance.findAllPosts();
    }

    async savePost(request: Request, response: Response, next: NextFunction) {
        try {
            const { userId, title, body } = request.body;

            this.PostServiceInstance.savePost(userId, title, body);
            return response.status(201).json({ message: 'Post created' });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, please try again' });
        }
    }

    async removePost(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        this.PostServiceInstance.removePost(+id);
    }
}
