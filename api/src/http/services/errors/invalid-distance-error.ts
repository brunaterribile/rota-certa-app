export class InvalidDistanceError extends Error {
  constructor() {
    super('Quilometragem inválida para o motorista.')
  }
}
