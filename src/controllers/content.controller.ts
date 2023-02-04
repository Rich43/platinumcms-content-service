import { BadRequestError, Body, Get, JsonController, Param, Patch, Post, } from 'routing-controllers';
import { ContentService } from '../services';
import { ContentResponseDto, CreateContentRequestDto, UpdateContentRequestDto } from '../dto';
import { singleton } from 'tsyringe';

@JsonController('/content')
@singleton()
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Get()
    async list() {
        return await this.contentService.list();
    }

    @Get('/read/:id')
    async read(@Param('id') id: number): Promise<ContentResponseDto | null> {
        return await this.contentService.read({id});
    }

    @Post()
    async create(
        @Body() ccDto: CreateContentRequestDto,
    ): Promise<ContentResponseDto> {
        return await this.contentService.create(ccDto);
    }

    @Patch()
    async patch(
        @Body() ucDto: UpdateContentRequestDto,
    ): Promise<ContentResponseDto> {
        const result = await this.contentService.update(ucDto);
        if (result === null) {
            throw new BadRequestError('Unable to find requested id');
        }
        return result;
    }
}
