import { prisma } from '@/lib/prisma'
import { Driver, Prisma, Ride } from '@prisma/client'
import { RidesRepository } from '../rides-repository'

export interface RideFilter {
  user_id: number
  driver_id?: number
}

export interface RidesWithDrivers extends Ride {
  driver: Partial<Driver> | null
}

export class PrismaRidesRepository implements RidesRepository {
  async createRide(data: Prisma.RideCreateInput): Promise<void> {
    await prisma.ride.create({
      data,
    })
  }

  async findMany(filter: RideFilter): Promise<RidesWithDrivers[]> {
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
