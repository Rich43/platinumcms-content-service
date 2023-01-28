import { ContentModel } from '../models';
import { Converter } from '../interfaces';
import { ContentResponseDto } from '../dto';
import { Service } from 'typedi';
import { ContentModelToContentResponseDtoConverter } from './contentModel.to.contentResponseDto.converter';
import {
    ContentRevisionModelToContentRevisionResponseDtoConverter
} from './contentRevisionModel.to.contentRevisionResponseDto.converter';

@Service()
export class ContentModelsToContentResponseDtosConverter implements Converter<ContentModel[], ContentResponseDto[]> {
    constructor(private contentModelToContentResponseDtoConverter: ContentModelToContentResponseDtoConverter,
                private contentRevisionModelToContentRevisionResponseDtoConverter :
                    ContentRevisionModelToContentRevisionResponseDtoConverter) {}

    convert(contentList: ContentModel[]): ContentResponseDto[] {
        const massagedResults: ContentResponseDto[] = [];
        for (const listItem of contentList) {
            const convertedResult = this.contentModelToContentResponseDtoConverter.convert(listItem);
            this.addContentRevisions(listItem, convertedResult);
            massagedResults.push(convertedResult);
        }
        return massagedResults;
    }

    private addContentRevisions(listItem: ContentModel, convertedResult: ContentResponseDto) {
        for (const contentRevision of listItem.contentRevisions) {
            convertedResult.contentRevisions.push(
                this.contentRevisionModelToContentRevisionResponseDtoConverter.convert(contentRevision)
            );
        }
    }
}
