import { getRepository } from 'typeorm';
import { Comment } from '../entity/Comment';

export class CommentService {
    private commentRepository = getRepository(Comment);

    /*async findAllPosts() {
        return this.postRepository.find();
    }*/

    async saveComment(userId: number, postId: number, body: string) {
        const newComment = new Comment();
        newComment.userId = userId;
        newComment.postId = postId;
        newComment.body = body;

        // save new Comment
        return this.commentRepository.save(newComment);
    }

    async removeOneComment(id: number) {
        const commentToRemove = await this.commentRepository.findOne(id);
        await this.commentRepository.remove(commentToRemove);
    }

    async findCommentForPost(postId: number) {
        return this.commentRepository.find({ postId });
    }

    async removeCommentForPost(postId: number) {
        const commentsToRemove = await this.commentRepository.find({ postId });
        await this.commentRepository.remove(commentsToRemove);
    }
}
