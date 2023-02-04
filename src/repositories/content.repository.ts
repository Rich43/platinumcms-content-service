import { ContentModel } from '../models';
import { DataSource, Repository } from 'typeorm';

export function ContentRepository(AppDataSource: DataSource): Repository<ContentModel> {
    return AppDataSource.getRepository(ContentModel);
}
