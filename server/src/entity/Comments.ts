import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Posts } from './Posts';
import { Users } from './Users';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Posts, (posts) => posts.id)
    postId: number;

    @Column({ type: 'character varying' })
    name: string;

    @ManyToOne(() => Users, (users) => users.id)
    emailCommentator: string;

    @Column({ type: 'character varying' })
    body: string;
}
