import {
  ConfirmRideBody,
  EstimateRideBody,
} from '../controllers/ride-controller'
import axios from 'axios'
import { PrismaDriversRepository } from '../repositories/prisma-drivers-repository'
import { PrismaRidesRepository } from '../repositories/prisma-rides-repository'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

export async function estimateRideService({
  origin,
  destination,
}: Partial<EstimateRideBody>) {
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

    if (!route) {
      throw new Error('Rota não encontrada.')
    }

    const distanceInKm = route.distanceMeters / 1000

    const prismaDriversRepository = new PrismaDriversRepository()
    const drivers = await prismaDriversRepository.findDrivers(distanceInKm)

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

export async function confirmRideService({
  customer_id,
  origin,
  destination,
  distance,
  duration,
  driver,
  value,
}: ConfirmRideBody): Promise<boolean> {
  const prismaDriversRepository = new PrismaDriversRepository()
  const driverData = await prismaDriversRepository.findById(String(driver.id))

  if (!driverData) {
    throw new Error('Motorista não encontrado.')
  }

  if (driverData.min_distance > distance) {
    throw new Error('Este motorista não aceita a distância informada.')
  }

  const prismaUserRepository = new PrismaUsersRepository()
  const userExist = await prismaUserRepository.findById(customer_id)

  if (!userExist) {
    await prismaUserRepository.createUser({ id: customer_id })
  }

  const prismaRidesRepository = new PrismaRidesRepository()
  await prismaRidesRepository.createRide({
    user: { connect: { id: customer_id } },
    driver: { connect: { id: String(driver.id) } },
    origin,
    destination,
    distance,
    duration,
    value,
  })

  return true
}

export async function getRidesService(customer_id: string, driver_id?: string) {
  if (driver_id) {
    const prismaDriversRepository = new PrismaDriversRepository()
    const driverData = await prismaDriversRepository.findById(driver_id)

    if (!driverData) {
      throw new Error('Motorista inválido.')
    }
  }

  const prismaRidesRepository = new PrismaRidesRepository()
  const rides = await prismaRidesRepository.findMany({
    user_id: customer_id,
    ...(driver_id ? { driver_id } : {}),
  })

  if (rides.length === 0) {
    throw new Error('Nenhuma corrida encontrada.')
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
