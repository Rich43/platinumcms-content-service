import {
    BadRequestError,
    Post,
    JsonController,
    Get, Body, Patch, Param,
} from 'routing-controllers';
import { ContentService } from '../services'
import { Service } from 'typedi';
import { CreateContentDto, UpdateContentDto } from '../dto';
import { ContentModel } from '../models/content.model';

@JsonController('/content')
@Service()
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Get()
    async list() {
        return await this.contentService.list();
    }

    @Get('/read/:id')
    async read(@Param('id') id: number) {
        return await this.contentService.read({id});
    }

    @Post()
    async create(
        @Body() ccDto: CreateContentDto,
    ): Promise<ContentModel> {
        return await this.contentService.create(ccDto);
    }

    @Patch()
    async patch(
        @Body() ucDto: UpdateContentDto,
    ): Promise<ContentModel> {
        const result = await this.contentService.update(ucDto);
        if (result === null) {
            throw new BadRequestError('Unable to find requested id');
        }
        return result;
    }
}
