import { ContentRevisionModel } from '../models';
import { Converter } from '../interfaces';
import { ContentRevisionResponseDto } from '../dto';
import { singleton } from 'tsyringe';

@singleton()
export class ContentRevisionModelToContentRevisionResponseDtoConverter implements Converter<ContentRevisionModel, ContentRevisionResponseDto> {
    convert(contentRevision: ContentRevisionModel): ContentRevisionResponseDto {
        return {
            id: contentRevision.id,
            content: contentRevision.content,
            summary: contentRevision.summary
        };
    }
}
