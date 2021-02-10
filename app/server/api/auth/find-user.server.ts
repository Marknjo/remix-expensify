import { db } from '~/utils/db.server'

export default async function findUser(email?: string, id?: string) {
  try {
    if (!email && !id) {
      const error = new Error('Failed to provide either user email or id')
      error.name = 'Invalid User Request'
      throw error
    }

    const foundUser = await db.user.findFirst({
      where: {
        ...(!id ? { email: email } : { id: id }),
      },
    })

    if (!foundUser) {
      throw new Error("Can't find requested user details")
    }

    return foundUser
  } catch (error) {
    throw error
  }
}
