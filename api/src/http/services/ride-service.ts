import { EstimateRideBody } from '../controllers/ride-controller'
import axios from 'axios'
import { PrismaDriversRepository } from '../repositories/prisma-drivers-repository'

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
    const durationInMinutes = Math.ceil(
      parseInt(route.duration.replace('s', ''), 10) / 60,
    )
    const prismaUsersRepository = new PrismaDriversRepository()
    const drivers = await prismaUsersRepository.findDrivers(distanceInKm)

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
      distance: distanceInKm.toFixed(2),
      duration: durationInMinutes,
      options: formatDrivers,
      routeResponse: route,
    }
  } catch (error) {
    console.error(
      'Erro ao calcular a rota:',
      error.response?.data || error.message,
    )
    throw new Error('Erro ao calcular a rota.')
  }
}
