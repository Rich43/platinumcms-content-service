import { IsBoolean, IsInt, IsString, Length, Min, MinLength, ValidateIf } from 'class-validator';

export class UpdateContentRequestDto {
    private _id!: number;

    get id(): number {
        return this._id;
    }

    @IsInt()
    @Min(0)
    set id(value: number) {
        this._id = value;
    }

    private _name?: string;

    get name(): string {
        return this._name || '';
    }

    @ValidateIf((val) => val.name !== undefined)
    @Length(2, 255)
    @IsString()
    set name(value: string | undefined) {
        this._name = String(value || '');
    }

    private _displayName?: string;

    get displayName(): string {
        return this._displayName || '';
    }

    @ValidateIf((val) => val.name !== undefined)
    @Length(2, 65535)
    @IsString()
    set displayName(value: string) {
        this._displayName = String(value || '');
    }

    private _content?: string;

    get content(): string {
        return this._content || '';
    }

    @ValidateIf((val) => val.name !== undefined)
    @MinLength(1)
    @IsString()
    set content(value: string) {
        this._content = String(value || '');
    }

    private _summary?: string;

    get summary(): string {
        return this._summary || '';
    }

    @ValidateIf((val) => val.name !== undefined)
    @IsString()
    set summary(value: string) {
        this._summary = String(value || '');
    }

    private _published?: boolean;

    get published(): boolean {
        return this._published || false;
    }

    @ValidateIf((val) => val.name !== undefined)
    @IsBoolean()
    set published(value: boolean) {
        this._published = Boolean(value);
    }
}
