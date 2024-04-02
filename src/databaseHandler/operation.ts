// import { CloseCall, OpenCall } from "../definitions/call";
import { Operation } from "@prisma/client"
import { report_include } from "./report"
import { prisma } from "./prisma"


const create = async (data: Operation) => {
    console.log(data)
    const operation = await prisma.operation.create({
        data: {
            culture: data.culture,
            areaMap: data.areaMap,
            equipment: data.equipment,
            model: data.model,
            service: data.service,
            reportId: data.reportId,
        },
    })
    console.log({ operation })
    return operation
}

const update = async (data: Operation) => {
    const report = await prisma.report.update({
        where: { id: data.reportId },
        data: {
            operation: {
                update: {
                    culture: data.culture,
                    areaMap: data.areaMap,
                    equipment: data.equipment,
                    model: data.model,
                    service: data.service,
                },
            },
        },
        include: report_include,
    })
    return {
        ...report,
        call: {
            ...report.call,
            talhao: { ...report.call.talhao, cover: "", tillage: { ...report.call.talhao.tillage, cover: "" } },
        },
    }
}

const list = async () => {
  return await prisma.operation.findMany();
};

const find = async (id: number) => {
  return await prisma.operation.findUnique({ where: { id } });
};

export default {
  create,
  find,
  update,
  list,
};
