import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContentRevisionModel } from './contentRevision.model';

@Entity('content')
export class ContentModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @Column()
    displayName!: string;

    @Column()
    published!: boolean;

    @OneToMany(() => ContentRevisionModel, (contentRevision) => contentRevision.parent, { cascade: true })
    contentRevisions!: ContentRevisionModel[];
}
