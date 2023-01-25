export interface CreateContentRequestDto {
    name: string;
    displayName: string;
    summary?: string;
    content: string;
    published: boolean;
}
