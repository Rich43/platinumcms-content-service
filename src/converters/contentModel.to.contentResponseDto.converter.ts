import { ContentModel } from '../models';
import { Converter } from '../interfaces';
import { ContentResponseDto } from '../dto';
import { singleton } from 'tsyringe';

@singleton()
export class ContentModelToContentResponseDtoConverter implements Converter<ContentModel, ContentResponseDto> {
    public convert(content: ContentModel): ContentResponseDto {
        return {
            id: content.id,
            name: content.name,
            displayName: content.displayName,
            published: content.published,
            contentRevisions: []
        };
    }
}
