import { NewCoordinate } from "../definitions/coordinate"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const create = async (data: NewCoordinate) => {
    console.log("Iniciando a criação do coordenada...")
    const coordinate = await prisma.coordinate.create({
        data: {
            x: data.x,
            y: data.y,
            tillageId: data.tillageId,
        },
    })
    console.log({ coordinate })

    console.log("Coordenada criada e associada ao terren:", coordinate)
    return { coordinate }
}

// const update = async (data: NewCoordinate & { id: number }) => {
//   const coordinate = await prisma.coordinate.update({
//     where: { tillageId: data.tillageId },
//     data: {
//       x: data.x,
//       y: data.y,
//     },
//   });
//   console.log("Coordinate Update: ", data);

//   return { coordinate };
// };

const list = async () => {
    return await prisma.coordinate.findMany({
        include: {
            tillage: true,
        },
    })
}

export default {
    create,
    // update,
    list,
}
