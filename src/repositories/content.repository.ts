import { ContentModel } from '../models';
import { DataSource, FindOneOptions, Repository } from 'typeorm';

export type ExtendedContentRepository = Repository<ContentModel> & {
    findOneByIdWithOptions(id: number): Promise<ContentModel | null>;
    findAndCountWithOptions(): Promise<[ContentModel[], number]>;
}

function getContentRepositoryOptions(): FindOneOptions<ContentModel> {
    return {
        relations: {
            contentRevisions: true
        },
        order: {
            contentRevisions: {
                id: 'DESC'
            }
        }
    };
}

export function ContentRepository(AppDataSource: DataSource): ExtendedContentRepository {
    return AppDataSource.getRepository(ContentModel).extend({
        findOneByIdWithOptions(id: number) {
            return this.findOne({
                where: {id}, ...getContentRepositoryOptions()
            });
        },
        findAndCountWithOptions() {
            return this.findAndCount(getContentRepositoryOptions());
        }
    });
}
