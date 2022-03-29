import { getRepository } from 'typeorm';
import { Post } from '../entity/Post';

export class PostService {
    private postRepository = getRepository(Post);

    async findAllPosts() {
        return this.postRepository.find();
    }
    async findOnePost(id: number) {
        try {
            return this.postRepository.findOne({ id });
        } catch (err) {
            return err;
        }
    }
    async savePost(userId: number, title: string, body: string) {
        const newPost = new Post();
        newPost.userId = userId;
        newPost.title = title;
        newPost.body = body;

        // save new Post
        return this.postRepository.save(newPost);
    }

    async removePost(id: number) {
        const postToRemove = await this.postRepository.findOne(id);
        await this.postRepository.remove(postToRemove);
    }

    async findPostsForUser(id: number) {
        return this.postRepository.find({ userId: id });
    }

    async findOneForPost(id: number) {
        try {
            const post = await this.postRepository
                .createQueryBuilder('post')
                .leftJoinAndSelect(
                    'post.userId',
                    'chatuser',
                    'post.userId=chatuser.id'
                )
                .where('post.id=:id', { id })
                .getOne();
            return post;
        } catch (err) {
            return err;
        }
    }
}
