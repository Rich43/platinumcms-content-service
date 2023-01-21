import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContentModel {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string

    @Column()
    displayName!: string

    @Column()
    content!: string

    @Column()
    published!: boolean
}
