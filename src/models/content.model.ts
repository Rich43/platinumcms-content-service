import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UpdateContentDto } from '../dto';

@Entity()
export class ContentModel implements UpdateContentDto {
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
