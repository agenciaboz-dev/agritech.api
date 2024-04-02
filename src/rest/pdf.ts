import express, { Express, Request, Response } from "express"
import { Prisma } from "@prisma/client"
import { pdf_include } from "../io/pdf"
import { prisma } from "../databaseHandler/prisma"
const router = express.Router()

router.post("/", async (request: Request, response: Response) => {
    const data = request.body as { id: number }

    type ReportPrisma = Prisma.ReportGetPayload<{ include: typeof pdf_include }>

    const report = (await prisma.report.findUnique({
        where: { id: data.id },
        include: {
            operation: true,
            material: true,
            techReport: { include: { flight: true } },
            treatment: { include: { products: true } },
            call: {
                include: {
                    producer: { include: { user: true } },
                    talhao: { include: { tillage: { include: { producer: true } } } },
                    kit: { include: { objects: true, employees: { include: { user: true } } } },
                },
            },
        },
    })) as ReportPrisma

    console.log(report)
    response.json(report)
})

export default router
