import { FastifyReply } from 'fastify'

export function sendErrorResponse(
  res: FastifyReply,
  statusCode: number,
  errorCode: string,
  errorDescription: string,
) {
  return res.status(statusCode).send({
    error_code: errorCode,
    error_description: errorDescription,
  })
}
