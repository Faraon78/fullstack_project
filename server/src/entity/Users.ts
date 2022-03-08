import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'NULL' })
    userName: string;

    @Column({ type: 'character varying' })
    password: string;

    @Column({ default: 'NULL' })
    realName: string;

    @Column({ type: 'character varying' })
    email: string;

    @Column({ default: 'NULL' })
    address: string;

    @Column({ default: 'NULL' })
    phone: string;

    @Column({ default: 'NULL' })
    website: string;

    @Column({ default: 'NULL' })
    company: string;

    @Column({ default: 'NULL' })
    avatar: string;
}
