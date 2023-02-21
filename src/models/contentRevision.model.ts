import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentModel } from './content.model';

@Entity('contentRevision')
export class ContentRevisionModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length: 2 ** 13})
    summary?: string;

    @Column('text')
    content!: string;

    @ManyToOne(() => ContentModel, (content) => content.contentRevisions)
    parent!: ContentModel;
}
