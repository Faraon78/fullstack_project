import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './Post';
import { Chatuser } from './Chatuser';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Post, (post) => post.id, {
        cascade: true,
    })
    postId: number;

    @ManyToOne(() => Chatuser, (user) => user.id, {
        cascade: true,
    })
    userId: number;

    @Column({ type: 'character varying' })
    body: string;
}
