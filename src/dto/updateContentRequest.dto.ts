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

    get name(): string | undefined {
        return this._name;
    }

    @ValidateIf((val) => val.name !== undefined)
    @Length(2, 255)
    @IsString()
    set name(value: string | undefined) {
        this._name = value;
    }

    private _displayName?: string;

    get displayName(): string | undefined {
        return this._displayName;
    }

    @ValidateIf((val) => val.name !== undefined)
    @Length(2, 65535)
    @IsString()
    set displayName(value: string | undefined) {
        this._displayName = value;
    }

    private _content?: string;

    get content(): string | undefined {
        return this._content;
    }

    @ValidateIf((val) => val.name !== undefined)
    @MinLength(1)
    @IsString()
    set content(value: string | undefined) {
        this._content = value;
    }

    private _summary?: string;

    get summary(): string | undefined {
        return this._summary;
    }

    @ValidateIf((val) => val.name !== undefined)
    @IsString()
    set summary(value: string | undefined) {
        this._summary = value;
    }

    private _published?: boolean;

    get published(): boolean | undefined {
        return this._published;
    }

    @ValidateIf((val) => val.name !== undefined)
    @IsBoolean()
    set published(value: boolean | undefined) {
        this._published = value;
    }
}
