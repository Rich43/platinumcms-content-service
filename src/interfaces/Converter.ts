export interface Converter<F, T> {
    convert(from: F): T
}
