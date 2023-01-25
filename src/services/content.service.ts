import { Service } from 'typedi';
import { CreateContentDto, IDDto, UpdateContentDto } from '../dto';
import { ContentModel, ContentRevisionModel } from '../models';
import AppDataSource from '../setup/datasource';
import { FindOneOptions } from 'typeorm';

function getContentRepositoryOptions(): FindOneOptions<ContentModel> {
    return {
        order: {
            contentRevisions: {
                id: 'DESC'
            }
        }
    };
}

@Service()
export class ContentService {
    contentRepository = AppDataSource.getRepository(ContentModel)
    contentRevisionRepository = AppDataSource.getRepository(ContentRevisionModel)

    async list() {
        return await this.contentRepository.findAndCount(getContentRepositoryOptions());
    }

    async read(idDto: IDDto) {
        return await this.contentRepository.findOne({
            where: {id: idDto.id}, ...getContentRepositoryOptions()
        });
    }

    async create(ccDto: CreateContentDto) {
        const contentModel = new ContentModel();
        contentModel.name = ccDto.name;
        contentModel.displayName = ccDto.displayName;
        contentModel.published = ccDto.published;
        const contentRevisionModel = new ContentRevisionModel();
        contentRevisionModel.content = ccDto.content;
        contentRevisionModel.summary = ccDto.summary;
        contentRevisionModel.parent = contentModel;
        contentModel.contentRevisions = [contentRevisionModel];
        await this.contentRepository.save(contentModel);
        return contentModel;
    }

    async update(ucDto: UpdateContentDto) {
        const contentModel = await this.contentRepository.findOne({
            where: {id: ucDto.id}, ...getContentRepositoryOptions()
        });
        if (contentModel) {
            if (ucDto.name || ucDto.displayName || ucDto.published) {
                contentModel.name = ucDto.name || contentModel.name;
                contentModel.displayName = ucDto.displayName || contentModel.displayName;
                contentModel.published = ucDto.published || contentModel.published;
            }
            if (ucDto.content || ucDto.summary) {
                const contentRevisionModel = new ContentRevisionModel();
                contentRevisionModel.content = ucDto.content || '';
                contentRevisionModel.summary = ucDto.summary || '';
                contentRevisionModel.parent = contentModel;
                contentModel.contentRevisions.push(contentRevisionModel);
                await this.contentRevisionRepository.save(contentRevisionModel);
            }
            await this.contentRepository.save(contentModel);
            return contentModel;
        } else {
            return null;
        }
    }

    async delete(idDto: IDDto) {
        const contentModel = await this.contentRepository.findOne({
            where: {id: idDto.id}, ...getContentRepositoryOptions()
        });
        if (contentModel) {
            await this.contentRepository.delete({id: contentModel.id});
            return true;
        } else {
            return false;
        }
    }
}
