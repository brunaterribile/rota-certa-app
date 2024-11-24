import { FastifyReply, FastifyRequest } from 'fastify'
import { estimateRideService } from '../services/ride-service'

export interface EstimateRideBody {
  customer_id: string
  origin: string
  destination: string
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
