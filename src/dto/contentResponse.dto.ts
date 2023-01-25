import { ContentRevisionResponseDto } from './contentRevisionResponse.dto';

export interface ContentResponseDto {
    id: number;
    name: string;
    displayName: string;
    published: boolean;
    contentRevisions: ContentRevisionResponseDto[];
}
