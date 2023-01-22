import {
    BadRequestError,
    Post,
    JsonController,
    BodyParam,
    Get,
} from 'routing-controllers'
import { ContentService } from '../services'
import { Service } from 'typedi';

@JsonController('/content')
@Service()
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Get()
    async query() {
        return []
    }

    @Post()
    async create(
        @BodyParam('username') name: string,
    ): Promise<boolean> {
        if (!name) {
            throw new BadRequestError('username is required')
        }
        return await this.contentService.create()
    }
}
