import { Driver } from '@prisma/client'
import { DriverWithReviews } from './prisma/prisma-drivers-repository'

export interface DriversRepository {
  findDrivers(distanceInKm: number): Promise<DriverWithReviews[]>
  findById(id: number): Promise<Driver | null>
}
