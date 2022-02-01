import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Comments} from "../entity/Comments";

export class CommentController {

    private commentRepository = getRepository(Comments);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.commentRepository.find();
    }
    async allforPost(request: Request, response: Response, next: NextFunction) {
        return this.commentRepository.find({ where: { postId: request.params.postId } });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.commentRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.commentRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let commentToRemove = await this.commentRepository.findOne(request.params.id);
        await this.commentRepository.remove(commentToRemove);
    }

}