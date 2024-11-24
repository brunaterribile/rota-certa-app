import { FastifyInstance } from 'fastify'
import { estimateRide } from './controllers/ride-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/ride/estimate', estimateRide)
}
