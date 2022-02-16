import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Users } from './Users'

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Users, (users) => users.id)
    userId: number

    @Column({ type: 'character varying' })
    title: string

    @Column({ type: 'character varying' })
    body: string
}
