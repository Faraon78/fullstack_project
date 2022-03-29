import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { CommentService } from '../service/CommentService';
export class CommentController {
    CommentServiceInstance = new CommentService();

    async saveComment(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const { userId, postId, body } = request.body;

            this.CommentServiceInstance.saveComment(userId, postId, body);
            return response.status(201).json({ message: 'Comment created' });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, please try again' });
        }
    }

    async removeOneComment(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const id = request.params.id;

            this.CommentServiceInstance.removeOneComment(+id);
            return response.status(200).json({ message: 'Comment deleted' });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, please try again' });
        }
    }
    async removeCommentforPost(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const postId = request.params.id;

            this.CommentServiceInstance.removeCommentForPost(+postId);
            return response.status(200).json({ message: 'Comments deleted' });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, please try again' });
        }
    }

    async commentForPost(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            const postId = request.params.id;
            const comments =
                await this.CommentServiceInstance.findCommentForPost(+postId);

            return comments;
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'Something went wrong, please try again' });
        }
    }
}
