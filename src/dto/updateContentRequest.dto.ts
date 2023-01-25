export interface UpdateContentRequestDto {
    id: number;
    name?: string;
    displayName?: string;
    content?: string;
    summary?: string;
    published?: boolean;
}
