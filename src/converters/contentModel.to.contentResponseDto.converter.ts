import { ContentModel } from '../models';
import { Converter } from '../interfaces';
import { ContentResponseDto } from '../dto';
import { singleton } from 'tsyringe';
import {
    ContentRevisionModelToContentRevisionResponseDtoConverter
} from './contentRevisionModel.to.contentRevisionResponseDto.converter';

@singleton()
export class ContentModelToContentResponseDtoConverter implements Converter<ContentModel, ContentResponseDto> {
    constructor(private contentRevisionModelToContentRevisionResponseDtoConverter:
                    ContentRevisionModelToContentRevisionResponseDtoConverter) {
    }

    public convert(content: ContentModel): ContentResponseDto {
        const contentResponseDto: ContentResponseDto = {
            id: content.id,
            name: content.name,
            displayName: content.displayName,
            published: content.published,
            contentRevisions: []
        };
        this.addContentRevisions(content, contentResponseDto);
        return contentResponseDto;
    }

    private addContentRevisions(contentModel: ContentModel, contentResponseDto: ContentResponseDto) {
        for (const contentRevision of contentModel.contentRevisions) {
            contentResponseDto.contentRevisions.push(
                this.contentRevisionModelToContentRevisionResponseDtoConverter.convert(contentRevision)
            );
        }
    }
}
