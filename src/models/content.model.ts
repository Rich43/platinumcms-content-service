import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('content')
export class ContentModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string

    @Column()
    displayName!: string

    @Column()
    content!: string

    @Column()
    published!: boolean
}
