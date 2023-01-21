import {
    BadRequestError,
    Post,
    JsonController,
    BodyParam,
    Get,
} from 'routing-controllers'
import { ContentService } from '../services'
import { Service } from 'typedi'

@JsonController()
@Service()
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Get('/content')
    async query() {
        return []
    }

    @Post('/content')
    async create(
        @BodyParam('username') name: string,
    ): Promise<boolean> {
        if (!name) {
            throw new BadRequestError('username is required')
        }
        return await this.contentService.create()
    }
}
