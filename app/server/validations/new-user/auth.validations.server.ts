import type { User } from '@prisma/client'
import type { IAuthValidationErrors } from '~/types'

export enum EAuthFields {
  NAME = 'NAME',
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
}

export type TAuthIgnoreList = Set<keyof typeof EAuthFields>

function isUsername(value?: string) {
  return value && value.trim().length > 0 && value.trim().length <= 50
}

function isValidEmail(value?: string) {
  return value && value.includes('@')
}

function isValidPassword(value?: string) {
  return value && value.trim().length >= 7
}

export default function validateCredentials(
  input: Partial<User>,
  ignoreList?: TAuthIgnoreList,
) {
  let validationErrors: IAuthValidationErrors = {}

  if (!ignoreList?.has(EAuthFields.NAME) && !isUsername(input?.name)) {
    validationErrors.name = 'Invalid username format.'
  }

  if (!ignoreList?.has(EAuthFields.EMAIL) && !isValidEmail(input?.email)) {
    validationErrors.email = 'Invalid email address.'
  }

  if (
    !ignoreList?.has(EAuthFields.PASSWORD) &&
    !isValidPassword(input?.password)
  ) {
    validationErrors.password =
      'Invalid password. Must be at least 7 characters long.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw {
      errors: validationErrors,
    }
  }
}
