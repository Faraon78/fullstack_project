import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Chatuser } from './Chatuser';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Chatuser, (user) => user.id, {
        cascade: true,
    })
    userId: number;

    @Column({ type: 'character varying' })
    title: string;

    @Column({ type: 'character varying' })
    body: string;
}
