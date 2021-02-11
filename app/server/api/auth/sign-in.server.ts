import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import findUser from './find-user.server'
import { createUserSession } from './sessions-utils.server'

export default async function signIn(input: Pick<User, 'email' | 'password'>) {
  try {
    const plainPassword = input.password
    const email = input.email

    const user = await findUser(email)

    const hashedPassword = user.password

    if (!(await bcrypt.compare(plainPassword, hashedPassword))) {
      throw new Error('Invalid password')
    }

    return createUserSession(user.id, '/expenses')
  } catch (error) {
    throw 'Username or Password invalid'
  }
}
