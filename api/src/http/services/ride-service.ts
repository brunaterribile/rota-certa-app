import {
  ConfirmRideBody,
  EstimateRideBody,
} from '../controllers/ride-controller'
import axios from 'axios'
import { UsersRepository } from '../repositories/users-repository'
import { DriversRepository } from '../repositories/drivers-repository'
import { RidesRepository } from '../repositories/rides-repository'
import { RideFilter } from '../repositories/prisma/prisma-rides-repository'
import { DriverNotFoundError } from './errors/driver-not-found-error'
import { InvalidDistanceError } from './errors/invalid-distance-error'
import { InvalidDriverError } from './errors/invalid-driver-error'
import { NoRidesFoundError } from './errors/no-rides-found-error'

export class EstimateRideUseCase {
  constructor(private prismaDriversRepository: DriversRepository) {}

  async execute({ origin, destination }: Partial<EstimateRideBody>) {
    const apiKey = process.env.GOOGLE_API_KEY
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${apiKey}`

    const requestBody = {
      origin: {
        address: origin,
      },
      destination: {
        address: destination,
      },
      travelMode: 'DRIVE',
    }

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': '*',
        },
      })

      const route = response.data.routes[0]
      const distanceInKm = route.distanceMeters / 1000

      const drivers =
        await this.prismaDriversRepository.findDrivers(distanceInKm)

      const formatDrivers = drivers.map((driver) => {
        return {
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.car,
          review: {
            rating: driver.reviews[0].rating,
            comment: driver.reviews[0].comment,
          },
          value: parseFloat((driver.price_per_km * distanceInKm).toFixed(2)),
        }
      })

      return {
        origin: route.legs[0].startLocation.latLng,
        destination: route.legs[0].endLocation.latLng,
        distance: distanceInKm,
        duration: route.duration,
        options: formatDrivers,
        routeResponse: route,
      }
    } catch (error) {
      console.error('Erro ao calcular a rota:', error)
      throw new Error('Erro ao calcular a rota.')
    }
  }
}

export class ConfirmRideUseCase {
  constructor(
    private prismaDriversRepository: DriversRepository,
    private prismaUsersRepository: UsersRepository,
    private prismaRidesRepository: RidesRepository,
  ) {}

  async execute({
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
  }: ConfirmRideBody): Promise<boolean> {
    const driverData = await this.prismaDriversRepository.findById(
      Number(driver.id),
    )

    if (!driverData) {
      throw new DriverNotFoundError()
    }

    if (driverData.min_distance > distance) {
      throw new InvalidDistanceError()
    }

    const userExist = await this.prismaUsersRepository.findById(
      Number(customer_id),
    )

    if (!userExist) {
      await this.prismaUsersRepository.createUser({ id: Number(customer_id) })
    }

    await this.prismaRidesRepository.createRide({
      user: { connect: { id: Number(customer_id) } },
      driver: { connect: { id: Number(driver.id) } },
      origin,
      destination,
      distance,
      duration,
      value,
    })

    return true
  }
}

export class GetRidesUseCase {
  constructor(
    private prismaDriversRepository: DriversRepository,
    private prismaRidesRepository: RidesRepository,
  ) {}

  async execute(customer_id: string, driver_id?: string) {
    if (driver_id) {
      const driverData = await this.prismaDriversRepository.findById(
        Number(driver_id),
      )

      if (!driverData) {
        throw new InvalidDriverError()
      }
    }

    const filter: RideFilter = {
      user_id: Number(customer_id),
      driver_id: Number(driver_id),
    }
    const rides = await this.prismaRidesRepository.findMany(filter)

    if (rides.length === 0) {
      throw new NoRidesFoundError()
    }

    return {
      customer_id,
      rides: rides.map((ride) => {
        return {
          id: ride.id,
          date: ride.date,
          origin: ride.origin,
          destination: ride.destination,
          distance: ride.distance,
          duration: ride.duration,
          driver: ride.driver,
          value: ride.value,
        }
      }),
    }
  }
}
