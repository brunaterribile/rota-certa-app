import { FastifyReply, FastifyRequest } from 'fastify'
import {
  confirmRideService,
  estimateRideService,
  getRidesService,
} from '../services/ride-service'

export interface EstimateRideBody {
  customer_id: string
  origin: string
  destination: string
}

interface Driver {
  id: number
  name: string
}
export interface ConfirmRideBody {
  customer_id: string
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
  const { customer_id, origin, destination } = req.body

  if (!origin || !destination) {
    return res.status(400).send({
      error_code: 'INVALID_DATA',
      error_description:
        'Os endereços de origem e de destino são obrigatórios.',
    })
  }

  if (!customer_id) {
    return res.status(400).send({
      error_code: 'INVALID_DATA',
      error_description: 'ID do usuário é obrigatório.',
    })
  }

  if (origin === destination) {
    return res.status(400).send({
      error_code: 'INVALID_DATA',
      error_description:
        'Os endereços de origem e de destino não podem ser iguais.',
    })
  }

  try {
    const estimation = await estimateRideService({
      origin,
      destination,
    })

    return res.status(200).send(estimation)
  } catch (error) {
    return res.status(400).send(error)
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

  if (!origin || !destination) {
    return res.status(400).send({
      error_code: 'INVALID_DATA',
      error_description:
        'Os endereços de origem e de destino são obrigatórios.',
    })
  }

  if (!customer_id) {
    return res.status(400).send({
      error_code: 'INVALID_DATA',
      error_description: 'ID do usuário é obrigatório.',
    })
  }

  if (origin === destination) {
    return res.status(400).send({
      error_code: 'INVALID_DATA',
      error_description:
        'Os endereços de origem e de destino não podem ser iguais.',
    })
  }

  try {
    await confirmRideService({
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
    console.error(error)
    return res.status(400).send({
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
    const rides = await getRidesService(customer_id, driver_id)

    return res.status(200).send(rides)
  } catch (error) {
    console.error(error)
    return res.status(400).send({
      error_code: 'CONFIRMATION_FAILED',
      error_description: 'Algo deu errado ao buscar corridas.',
    })
  }
}
