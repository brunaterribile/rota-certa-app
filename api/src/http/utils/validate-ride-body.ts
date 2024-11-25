import { EstimateRideBody } from '../controllers/ride-controller'

export function validateRideBody(body: EstimateRideBody): string | null {
  const { origin, destination, customer_id } = body

  if (!origin || !destination) {
    return 'Os endereços de origem e de destino são obrigatórios.'
  }

  if (!customer_id) {
    return 'ID do usuário é obrigatório.'
  }

  if (origin === destination) {
    return 'Os endereços de origem e de destino não podem ser iguais.'
  }

  return null
}
