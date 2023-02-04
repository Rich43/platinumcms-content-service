import { ContentModel } from '../models';
import { Converter } from '../interfaces';
import { ContentResponseDto } from '../dto';
import { ContentModelToContentResponseDtoConverter } from './contentModel.to.contentResponseDto.converter';
import { singleton } from 'tsyringe';

@singleton()
export class ContentModelsToContentResponseDtosConverter implements Converter<ContentModel[], ContentResponseDto[]> {
    constructor(private contentModelToContentResponseDtoConverter: ContentModelToContentResponseDtoConverter) {
    }

    convert(contentList: ContentModel[]): ContentResponseDto[] {
        const convertedResults: ContentResponseDto[] = [];
        for (const listItem of contentList) {
            convertedResults.push(this.contentModelToContentResponseDtoConverter.convert(listItem));
        }
        return convertedResults;
    }
}
