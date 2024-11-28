import { FastifyReply, FastifyRequest } from 'fastify'
import {
  ConfirmRideUseCase,
  EstimateRideUseCase,
  GetRidesUseCase,
} from '../services/ride-service'
import { PrismaDriversRepository } from '../repositories/prisma/prisma-drivers-repository'
import { PrismaRidesRepository } from '../repositories/prisma/prisma-rides-repository'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { sendErrorResponse } from '../utils/send-error-response'
import { validateRideBody } from '../utils/validate-ride-body'
import { DriverNotFoundError } from '../services/errors/driver-not-found-error'
import { InvalidDistanceError } from '../services/errors/invalid-distance-error'
import { InvalidDriverError } from '../services/errors/invalid-driver-error'
import { NoRidesFoundError } from '../services/errors/no-rides-found-error'

export interface EstimateRideBody {
  customer_id: number
  origin: string
  destination: string
}

interface Driver {
  id: number
  name: string
}
export interface ConfirmRideBody {
  customer_id: number
  origin: string
  destination: string
  distance: number
  duration: string
  driver: Driver
  value: number
}

export async function estimateRide(
  req: FastifyRequest<{ Body: EstimateRideBody }>,
  res: FastifyReply,
) {
  const { origin, destination } = req.body

  const validationError = validateRideBody(req.body)

  if (validationError) {
    return sendErrorResponse(res, 400, 'INVALID_DATA', validationError)
  }

  try {
    const prismaDriversRepository = new PrismaDriversRepository()
    const estimateRideUseCase = new EstimateRideUseCase(prismaDriversRepository)

    const estimation = await estimateRideUseCase.execute({
      origin,
      destination,
    })

    return res.status(200).send(estimation)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export async function confirmRide(
  req: FastifyRequest<{ Body: ConfirmRideBody }>,
  res: FastifyReply,
) {
  const {
    customer_id,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
  } = req.body

  const validationError = validateRideBody(req.body)

  if (validationError) {
    return sendErrorResponse(res, 400, 'INVALID_DATA', validationError)
  }

  try {
    const prismaRideRepository = new PrismaRidesRepository()
    const prismaDriversRepository = new PrismaDriversRepository()
    const prismaUserRepository = new PrismaUsersRepository()

    const confirmRideUseCase = new ConfirmRideUseCase(
      prismaDriversRepository,
      prismaUserRepository,
      prismaRideRepository,
    )
    await confirmRideUseCase.execute({
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    })

    return res.status(200).send({
      success: true,
    })
  } catch (error) {
    if (error instanceof DriverNotFoundError) {
      return res.status(404).send({
        error_code: 'DRIVER_NOT_FOUND',
        error_description: error.message,
      })
    }

    if (error instanceof InvalidDistanceError) {
      return res.status(406).send({
        error_code: 'INVALID_DISTANCE',
        error_description: error.message,
      })
    }
    console.log(error)
    return res.status(500).send({
      error_code: 'CONFIRMATION_FAILED',
      error_description: 'Algo deu errado ao confirmar a corrida.',
    })
  }
}

export async function getRides(
  req: FastifyRequest<{
    Params: { customer_id: string }
    Querystring: { driver_id?: string }
  }>,
  res: FastifyReply,
) {
  const { customer_id } = req.params
  const { driver_id } = req.query

  if (!customer_id) {
    return res.status(400).send({
      error_code: 'INVALID_DATA',
      error_description: 'ID do usuário é obrigatório.',
    })
  }

  try {
    const prismaRideRepository = new PrismaRidesRepository()
    const prismaDriversRepository = new PrismaDriversRepository()

    const getRidesUseCase = new GetRidesUseCase(
      prismaDriversRepository,
      prismaRideRepository,
    )
    const rides = await getRidesUseCase.execute(customer_id, driver_id)

    return res.status(200).send(rides)
  } catch (error) {
    if (error instanceof InvalidDriverError) {
      return res.status(400).send({
        error_code: 'INVALID_DRIVER',
        error_description: error.message,
      })
    }

    if (error instanceof NoRidesFoundError) {
      return res.status(404).send({
        error_code: 'NO_RIDES_FOUND',
        error_description: error.message,
      })
    }

    return res.status(500).send({
      error_code: 'SEARCH_FAILED',
      error_description: 'Algo deu errado ao buscar corridas.',
    })
  }
}

function calculateZoomLevel(viewport: {
  high: { latitude: number; longitude: number }
  low: { latitude: number; longitude: number }
}): number {
  const WORLD_DIM = { height: 256, width: 256 }
  const ZOOM_MAX = 21

  function latRad(lat: number) {
    const sin = Math.sin((lat * Math.PI) / 180)
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2
  }

  function zoom(mapPx: number, worldPx: number, fraction: number) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2)
  }

  const latFraction =
    (latRad(viewport.high.latitude) - latRad(viewport.low.latitude)) / Math.PI
  const lngDiff = viewport.high.longitude - viewport.low.longitude
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360

  const latZoom = zoom(WORLD_DIM.height, 256, latFraction)
  const lngZoom = zoom(WORLD_DIM.width, 256, lngFraction)

  return Math.min(latZoom, lngZoom, ZOOM_MAX)
}

export async function getStaticMap(
  req: FastifyRequest<{
    Querystring: {
      startLat: number
      startLng: number
      endLat: number
      endLng: number
      polyline: string
      viewport: string
    }
  }>,
  res: FastifyReply,
) {
  const { startLat, startLng, endLat, endLng, polyline, viewport } = req.query
  const apiKey = process.env.GOOGLE_API_KEY

  if (!startLat || !startLng || !endLat || !endLng || !polyline || !viewport) {
    return res.status(400).send({ error: 'Invalid parameters' })
  }

  const viewportObj = JSON.parse(viewport)
  const zoom = calculateZoomLevel(viewportObj)

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?zoom=${zoom}&size=600x400&markers=color:blue%7Clabel:A%7C${startLat},${startLng}&markers=color:red%7Clabel:B%7C${endLat},${endLng}&path=enc:${encodeURIComponent(polyline)}&key=${apiKey}`

  return res.send({ mapUrl })
}
