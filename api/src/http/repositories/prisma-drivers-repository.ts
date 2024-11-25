import { prisma } from '@/lib/prisma'

export class PrismaDriversRepository {
  async findDrivers(distanceInKm: number) {
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

  async findById(id: string) {
    const driver = await prisma.driver.findUnique({
      where: { id },
    })

    if (!driver) return null

    return driver
  }
}
