import { Service } from 'typedi';
import { CreateContentRequestDto } from '../dto';
import { Converter } from '../interfaces';
import { ContentModel } from '../models';

@Service()
export class CreateContentRequestDtoToContentModelConverter implements Converter<CreateContentRequestDto, ContentModel> {
    convert(ccDto: CreateContentRequestDto): ContentModel {
        const contentModel = new ContentModel();
        contentModel.name = ccDto.name;
        contentModel.displayName = ccDto.displayName;
        contentModel.published = ccDto.published;
        return contentModel;
    }
}
