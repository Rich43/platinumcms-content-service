import { ContentRevisionModel } from '../models';
import { DataSource, Repository } from 'typeorm';

export function ContentRevisionRepository(AppDataSource: DataSource): Repository<ContentRevisionModel> {
    return AppDataSource.getRepository(ContentRevisionModel);
}
