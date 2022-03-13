import { NextFunction, Request, Response } from 'express';
import { PostService } from '../service/PostService';
import { CommentService } from '../service/CommentService';

export class PostController {
    PostServiceInstance = new PostService();
    CommentServiceInstance = new CommentService();

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
        try {
            const id = request.params.id;

            await this.CommentServiceInstance.removeCommentForPost(+id);
            await this.PostServiceInstance.removePost(+id);
            return response.status(200).json({ message: 'Post deleted' });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, please try again' });
        }
    }

    async findPostsForUser(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        const id = request.params.id;
        return this.PostServiceInstance.findPostsForUser(+id);
    }
}
