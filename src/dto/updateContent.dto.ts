export interface UpdateContentDto {
    id: number;
    name?: string;
    displayName?: string;
    content?: string;
    summary?: string;
    published?: boolean;
}
