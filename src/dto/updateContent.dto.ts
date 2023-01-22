import { CreateContentDto } from './createContent.dto';

export interface UpdateContentDto extends CreateContentDto {
    id: number;
}
