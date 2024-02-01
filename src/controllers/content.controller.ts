import { ContentService } from '../services';
import { CreateContentRequestDto, UpdateContentRequestDto } from '../dto';
import { singleton } from 'tsyringe';

@singleton()
export class ContentController {
    constructor(private contentService: ContentService) {}

    async list() {
        const listValue = await this.contentService.list();
        return JSON.stringify(listValue);
    }

    async read(id: number): Promise<string> {
        const readContent = await this.contentService.read({id});
        return JSON.stringify(readContent);
    }

    async create(ccDto: CreateContentRequestDto): Promise<string> {
        const contentResponseDto = await this.contentService.create(ccDto);
        return JSON.stringify(contentResponseDto);
    }

    async patch(ucDto: UpdateContentRequestDto): Promise<string> {
        const result = await this.contentService.update(ucDto);
        if (result === null) {
            return JSON.stringify({'type': 'error', 'message': 'Unable to find requested id'});
        }
        return JSON.stringify(result);
    }
}
