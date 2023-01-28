import { Service } from 'typedi';
import { CreateContentRequestDto, IDDto, UpdateContentRequestDto } from '../dto';
import { ContentModel, ContentRevisionModel } from '../models';
import AppDataSource from '../setup/datasource';
import { FindOneOptions } from 'typeorm';
import {
    ContentModelsToContentResponseDtosConverter,
    ContentModelToContentResponseDtoConverter,
    ContentRevisionModelToContentRevisionResponseDtoConverter,
    CreateContentRequestDtoToContentModelConverter,
    CreateContentRequestDtoToContentRevisionModelConverter
} from '../converters';

@Service()
export class ContentService {
    contentRepository = AppDataSource.getRepository(ContentModel)
    contentRevisionRepository = AppDataSource.getRepository(ContentRevisionModel)

    constructor(private contentModelToContentResponseDtoConverter: ContentModelToContentResponseDtoConverter,
                private contentModelsToContentResponseDtosConverter: ContentModelsToContentResponseDtosConverter,
                private contentRevisionModelToContentRevisionResponseDtoConverter:
                    ContentRevisionModelToContentRevisionResponseDtoConverter,
                private createContentRequestDtoToContentModelConverter:
                    CreateContentRequestDtoToContentModelConverter,
                private createContentRequestDtoToContentRevisionModelConverter:
                    CreateContentRequestDtoToContentRevisionModelConverter) {}

    async list() {
        const results = await this.contentRepository.findAndCount(this.getContentRepositoryOptions());
        return [this.contentModelsToContentResponseDtosConverter.convert(results[0]), results[1]];
    }

    async read(idDto: IDDto) {
        const result = await this.findOneById(idDto);
        if (result) {
            return this.convertContentAndAddRevisions(result);
        }
        return null;
    }

    async create(ccDto: CreateContentRequestDto) {
        const contentModel = this.createContentRequestDtoToContentModelConverter.convert(ccDto);
        const contentRevisionModel = this.createContentRequestDtoToContentRevisionModelConverter.convert(ccDto);
        contentModel.contentRevisions = [contentRevisionModel];
        await this.contentRepository.save(contentModel);
        return this.convertContentAndAddRevisions(contentModel);
    }

    async update(ucDto: UpdateContentRequestDto) {
        const contentModel = await this.findOneById({id: ucDto.id});
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
        const contentModel = await this.findOneById(idDto);
        if (contentModel) {
            await this.contentRepository.delete({id: contentModel.id});
            return true;
        } else {
            return false;
        }
    }

    private async findOneById(idDto: IDDto) {
        return await this.contentRepository.findOne({
            where: {id: idDto.id}, ...this.getContentRepositoryOptions()
        });
    }

    private convertContentAndAddRevisions(contentModel: ContentModel) {
        const contentResponseDto = this.contentModelToContentResponseDtoConverter.convert(contentModel);
        for (const contentRevision of contentModel.contentRevisions) {
            contentResponseDto.contentRevisions.push(
                this.contentRevisionModelToContentRevisionResponseDtoConverter.convert(contentRevision)
            );
        }
        return contentResponseDto;
    }

    private getContentRepositoryOptions(): FindOneOptions<ContentModel> {
        return {
            order: {
                contentRevisions: {
                    id: 'DESC'
                }
            }
        };
    }
}
