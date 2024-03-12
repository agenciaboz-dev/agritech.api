import { CalendarHandler } from "../types/calendar"
import { Calendar, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// const createEmp = async (data: NewEmployeeCalendar) => {
//   console.log("Iniciando a criação do calendario do Empregado...");
//   const calendar = await prisma.calendar.create({
//     data: {
//       name: data.name,
//       employeeId: data.employeeId,
//     },
//   });
//   console.log({ calendar });

//   console.log("Calendario do Empregado Criado:", calendar);
//   return calendar;
// };

// const createKit = async (data: NewKitCalendar) => {
//   console.log("Iniciando a criação do calendario do Empregado...");
//   const calendar = await prisma.calendar.create({
//     data: {
//       name: data.name,
//       kitId: data.kitId,
//     },
//   });
//   console.log({ calendar });

//   console.log("Calendario do Empregado Criado:", calendar);
//   return calendar;
// };

const update = async (data: Calendar) => {
    const calendar = await prisma.calendar.update({
        where: { id: data.id },
        data: {
            name: data.name,
        },
    })
    console.log("Coordinate Update: ", data)

    return calendar
}

const list = async () => {
    return await prisma.calendar.findMany({
        include: {
            employee: true,
            kit: true,
        },
    })
}

export default {
    // createEmp,
    // createKit,
    update,
    list,
}
