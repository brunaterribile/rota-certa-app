import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(id: number): Promise<User | null>
  createUser(data: Prisma.UserCreateInput): Promise<void>
}
