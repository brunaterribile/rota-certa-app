import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaRidesRepository {
  async createRide(data: Prisma.RideCreateInput) {
    await prisma.ride.create({
      data,
    })
  }
}
