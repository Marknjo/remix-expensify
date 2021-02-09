import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { db } from '~/utils/db.server'

export default async function createUser(
  inputs: Pick<User, 'name' | 'email' | 'password'>,
) {
  try {
    // hash user password
    const hashedPassword = await bcrypt.hash(inputs.password, 12)

    const user = await db.user.create({
      data: {
        ...inputs,
        password: hashedPassword,
        locale: 'en-KE',
        currencyCode: 'KES',
      },
    })

    // generate login token

    // return user
    return user
  } catch (error) {
    throw new Error('Failed to create a new user')
  }
}
