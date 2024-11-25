export class NoRidesFoundError extends Error {
  constructor() {
    super('Nenhum registro encontrado')
  }
}
