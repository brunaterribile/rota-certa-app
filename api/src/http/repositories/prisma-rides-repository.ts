import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaRidesRepository {
  async createRide(data: Prisma.RideCreateInput) {
    await prisma.ride.create({
      data,
    })
  }

  async findMany(filter: { user_id: string; driver_id?: string }) {
    const rides = await prisma.ride.findMany({
      where: {
        user_id: filter.user_id,
        ...(filter.driver_id ? { driver_id: filter.driver_id } : {}),
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    })

    return rides
  }
}
