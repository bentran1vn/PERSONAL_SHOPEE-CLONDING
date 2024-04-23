/* eslint-disable import/no-named-as-default-member */
import axios, { AxiosError } from 'axios'
import config from 'src/constant/config'
import { HttpStatusCode } from 'src/constant/httpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function rateSale(original: number, sale: number) {
  return Math.round(((original - sale) / original) * 100) + '%'
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export function generateNameId({ name, id }: { name: string; id: string }) {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i.${id}`
}

export function getIdFromNameId(nameId: string) {
  const arr = nameId.split('-i.')
  return arr[arr.length - 1]
}

export const getURLAvatar = (avatarName?: string) =>
  avatarName ? `${config.baseURL}/images/${avatarName}` : 'https://picsum.photos/200/300'
