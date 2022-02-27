import { getRepository } from 'typeorm'
import { Posts } from '../entity/Posts'

export class PostsService {
    private postsRepository = getRepository(Posts)

    async findAllPosts() {
        return this.postsRepository.find()
    }

    async savePost(userId: number, title: string, body: string) {
        const newPost = new Posts()
        newPost.userId = userId
        newPost.title = title
        newPost.body = body

        // сохраняем новой Post
        return this.postsRepository.save(newPost)
    }

    async removePost(id: number) {
        const postToRemove = await this.postsRepository.findOne(id)
        await this.postsRepository.remove(postToRemove)
    }
}
