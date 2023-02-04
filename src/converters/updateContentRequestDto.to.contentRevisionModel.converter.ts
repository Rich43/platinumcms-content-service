import { ContentRevisionModel } from '../models';
import { Converter } from '../interfaces';
import { UpdateContentRequestDto } from '../dto';
import { singleton } from 'tsyringe';

@singleton()
export class UpdateContentRequestDtoToContentRevisionModelConverter implements Converter<UpdateContentRequestDto, ContentRevisionModel> {
    convert(ucDto: UpdateContentRequestDto): ContentRevisionModel {
        const contentRevisionModel = new ContentRevisionModel();
        contentRevisionModel.content = ucDto.content || '';
        contentRevisionModel.summary = ucDto.summary || '';
        return contentRevisionModel;
    }
}
