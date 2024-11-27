import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.driver.createMany({
    data: [
      {
        id: 1,
        name: 'Homer Simpson',
        description:
          'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        car: 'Plymouth Valiant 1973 rosa e enferrujado',
        price_per_km: 2.5,
        min_distance: 1,
      },
      {
        id: 2,
        name: 'Dominic Toretto',
        description:
          'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        car: 'Dodge Charger R/T 1970 modificado',
        price_per_km: 5.0,
        min_distance: 5,
      },
      {
        id: 3,
        name: 'James Bond',
        description:
          'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        car: 'Aston Martin DB5 clássico',
        price_per_km: 10.0,
        min_distance: 10,
      },
    ],
  })

  await prisma.review.createMany({
    data: [
      {
        id: 1,
        driver_id: 1,
        rating: 2,
        comment:
          'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      },
      {
        id: 2,
        driver_id: 2,
        rating: 4,
        comment:
          'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      },
      {
        id: 3,
        driver_id: 3,
        rating: 5,
        comment:
          'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      },
    ],
  })

  console.log('Seed finalizado: motoristas criados!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
