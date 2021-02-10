import type { User } from '@prisma/client'
import type { IAuthValidationErrors } from '~/types'

function isUsername(value?: string) {
  return value && value.trim().length > 0 && value.trim().length <= 50
}

function isValidEmail(value?: string) {
  return value && value.includes('@')
}

function isValidPassword(value?: string) {
  return value && value.trim().length >= 7
}

export default function validateCredentials(input: Partial<User>) {
  let validationErrors: IAuthValidationErrors = {}

  if (!isUsername(input?.name)) {
    validationErrors.name = 'Invalid username format.'
  }

  if (!isValidEmail(input?.email)) {
    validationErrors.email = 'Invalid email address.'
  }

  if (!isValidPassword(input?.password)) {
    validationErrors.password =
      'Invalid password. Must be at least 7 characters long.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw {
      errors: validationErrors,
    }
  }
}
