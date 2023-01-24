export interface CreateContentDto {
    name: string;
    displayName: string;
    summary?: string;
    content: string;
    published: boolean;
}
