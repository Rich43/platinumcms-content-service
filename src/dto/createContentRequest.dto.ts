import { IsBoolean, IsString, Length, MaxLength, MinLength, ValidateIf } from 'class-validator';

export class CreateContentRequestDto {
    private _name!: string;

    get name(): string {
        return this._name;
    }

    @Length(2, 255)
    @IsString()
    set name(value: string) {
        this._name = value;
    }

    private _displayName!: string;

    get displayName(): string {
        return this._displayName;
    }

    @Length(2, 65535)
    @IsString()
    set displayName(value: string) {
        this._displayName = value;
    }

    private _summary?: string;

    get summary(): string | undefined {
        return this._summary;
    }

    @ValidateIf((val) => val.name !== undefined)
    @MaxLength(65535)
    @IsString()
    set summary(value: string | undefined) {
        this._summary = value === undefined ? '' : value;
    }

    private _content!: string;

    get content(): string {
        return this._content;
    }

    @MinLength(1)
    @IsString()
    set content(value: string) {
        this._content = value;
    }

    private _published!: boolean;

    get published(): boolean {
        return this._published;
    }

    @IsBoolean()
    set published(value: boolean) {
        this._published = value;
    }
}
