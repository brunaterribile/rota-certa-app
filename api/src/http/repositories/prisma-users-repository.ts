import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }

  async createUser(data: Prisma.UserCreateInput) {
    await prisma.user.create({
      data,
    })
  }
}
