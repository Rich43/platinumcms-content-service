import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ContentRevisionModel } from './contentRevision.model';

@Entity('content')
export class ContentModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    displayName!: string;

    @Column()
    published!: boolean;

    @Column()
    contentRevisions!: ContentRevisionModel[];
}
