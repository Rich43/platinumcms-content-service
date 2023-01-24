import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ContentModel } from './content.model';

@Entity('contentRevision')
export class ContentRevisionModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    summary?: string;

    @Column()
    content!: string;

    @Column()
    parent!: ContentModel;
}
