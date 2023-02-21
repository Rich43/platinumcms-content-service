import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContentRevisionModel } from './contentRevision.model';

@Entity('content')
export class ContentModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true, length: 255})
    name!: string;

    @Column({length: 2 ** 13})
    displayName!: string;

    @Column()
    published!: boolean;

    @OneToMany(() => ContentRevisionModel, (contentRevision) => contentRevision.parent, { cascade: true })
    contentRevisions!: ContentRevisionModel[];
}
