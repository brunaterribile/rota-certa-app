import { prisma } from '@/lib/prisma'
import { Driver, Review } from '@prisma/client'
import { DriversRepository } from '../drivers-repository'

export interface DriverWithReviews extends Driver {
  id: number
  name: string
  car: string
  price_per_km: number
  reviews: Review[]
}

export class PrismaDriversRepository implements DriversRepository {
  async findDrivers(distanceInKm: number): Promise<DriverWithReviews[]> {
    const drivers = await prisma.driver.findMany({
      where: {
        min_distance: {
          lte: distanceInKm,
        },
      },
      include: {
        reviews: true,
      },
      orderBy: {
        price_per_km: 'asc',
      },
    })

    return drivers
  }

  async findById(id: number): Promise<Driver | null> {
    const driver = await prisma.driver.findUnique({
      where: { id },
    })

    if (!driver) return null

    return driver
  }
}
