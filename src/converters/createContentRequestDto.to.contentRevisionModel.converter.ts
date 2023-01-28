import { Service } from 'typedi';
import { ContentRevisionModel } from '../models';
import { Converter } from '../interfaces';
import { CreateContentRequestDto } from '../dto';

@Service()
export class CreateContentRequestDtoToContentRevisionModelConverter implements Converter<CreateContentRequestDto, ContentRevisionModel> {
    convert(ccDto: CreateContentRequestDto): ContentRevisionModel {
        const contentRevisionModel = new ContentRevisionModel();
        contentRevisionModel.content = ccDto.content;
        contentRevisionModel.summary = ccDto.summary;
        return contentRevisionModel;
    }
}
