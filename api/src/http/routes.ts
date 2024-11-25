import { FastifyInstance } from 'fastify'
import { confirmRide, estimateRide } from './controllers/ride-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/ride/estimate', estimateRide)
  app.patch('/ride/confirm', confirmRide)
}
