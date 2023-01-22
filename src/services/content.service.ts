import { Service } from 'typedi'
import { CreateContentDto, IDDto, UpdateContentDto } from '../dto';
import { ContentModel } from '../models/content.model';
import AppDataSource from '../setup/datasource';

@Service()
export class ContentService {
    contentRepository = AppDataSource.getRepository(ContentModel)

    async list() {
        return await this.contentRepository.findAndCount();
    }

    async read(idDto: IDDto) {
        return await this.contentRepository.findOneBy({id: idDto.id});
    }

    async create(ccDto: CreateContentDto) {
        const contentModel = new ContentModel();
        Object.assign(contentModel, ccDto);
        await this.contentRepository.save(contentModel);
        return contentModel;
    }

    async update(ucDto: UpdateContentDto) {
        const contentModel = await this.contentRepository.findOneBy({id: ucDto.id});
        if (contentModel) {
            Object.assign(contentModel, ucDto);
            await this.contentRepository.save(contentModel);
            return contentModel;
        } else {
            return null;
        }
    }

    async delete(idDto: IDDto) {
        const contentModel = await this.contentRepository.findOneBy({id: idDto.id});
        if (contentModel) {
            await this.contentRepository.delete({id: contentModel.id});
            return true;
        } else {
            return false;
        }
    }
}
