import { Prisma } from '@prisma/client'
import { RideFilter, RidesWithDrivers } from './prisma/prisma-rides-repository'

export interface RidesRepository {
  createRide(data: Prisma.RideCreateInput): Promise<void>
  findMany(filter: RideFilter): Promise<RidesWithDrivers[]>
}
