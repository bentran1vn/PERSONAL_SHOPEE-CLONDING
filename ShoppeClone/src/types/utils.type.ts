export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export interface SuccessResponse<Data> {
  message: string
  data: Data
}

// -? loại bỏ undefined của key optional
// handle?
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
