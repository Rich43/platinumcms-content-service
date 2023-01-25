import { Service } from 'typedi';
import {
    ContentResponseDto,
    ContentRevisionResponseDto,
    CreateContentRequestDto,
    IDDto,
    UpdateContentRequestDto
} from '../dto';
import { ContentModel, ContentRevisionModel } from '../models';
import AppDataSource from '../setup/datasource';
import { FindOneOptions } from 'typeorm';

@Service()
export class ContentService {
    contentRepository = AppDataSource.getRepository(ContentModel)
    contentRevisionRepository = AppDataSource.getRepository(ContentRevisionModel)

    async list() {
        const results = await this.contentRepository.findAndCount(this.getContentRepositoryOptions());
        return [this.massageContentList(results[0]), results[1]];
    }

    async read(idDto: IDDto) {
        const result = await this.findOneById(idDto);
        if (result) {
            return this.massageContentAndAddRevisions(result);
        }
        return null;
    }

    async create(ccDto: CreateContentRequestDto) {
        const contentModel = this.contentModelFromRequestDto(ccDto);
        const contentRevisionModel = this.contentRevisionModelFromRequestDto(ccDto, contentModel);
        contentModel.contentRevisions = [contentRevisionModel];
        await this.contentRepository.save(contentModel);
        return this.massageContentAndAddRevisions(contentModel);
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

    private massageContentAndAddRevisions(contentModel: ContentModel) {
        const contentResponseDto = this.massageContent(contentModel);
        this.addContentRevisions(contentModel, contentResponseDto);
        return contentResponseDto;
    }

    private contentRevisionModelFromRequestDto(ccDto: CreateContentRequestDto, contentModel: ContentModel) {
        const contentRevisionModel = new ContentRevisionModel();
        contentRevisionModel.content = ccDto.content;
        contentRevisionModel.summary = ccDto.summary;
        contentRevisionModel.parent = contentModel;
        return contentRevisionModel;
    }

    private contentModelFromRequestDto(ccDto: CreateContentRequestDto) {
        const contentModel = new ContentModel();
        contentModel.name = ccDto.name;
        contentModel.displayName = ccDto.displayName;
        contentModel.published = ccDto.published;
        return contentModel;
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

    private massageContent(content: ContentModel): ContentResponseDto {
        return {
            id: content.id,
            name: content.name,
            displayName: content.displayName,
            published: content.published,
            contentRevisions: []
        };
    }

    private massageContentRevision(contentRevision: ContentRevisionModel): ContentRevisionResponseDto {
        return {
            id: contentRevision.id,
            content: contentRevision.content,
            summary: contentRevision.summary
        };
    }

    private massageContentList(contentList: ContentModel[]) {
        const massagedResults: ContentResponseDto[] = [];
        for (const listItem of contentList) {
            const convertedResult = this.massageContent(listItem);
            this.addContentRevisions(listItem, convertedResult);
            massagedResults.push(convertedResult);
        }
        return massagedResults;
    }

    private addContentRevisions(listItem: ContentModel, convertedResult: ContentResponseDto) {
        for (const contentRevision of listItem.contentRevisions) {
            convertedResult.contentRevisions.push(this.massageContentRevision(contentRevision));
        }
    }
}
