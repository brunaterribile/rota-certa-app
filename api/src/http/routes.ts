import { FastifyInstance } from 'fastify'
import {
  confirmRide,
  estimateRide,
  getRides,
} from './controllers/ride-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/ride/estimate', estimateRide)
  app.patch('/ride/confirm', confirmRide)
  app.get('/ride/:customer_id', getRides)
}
