import { Prisma } from "@prisma/client"

export const pdf_include = Prisma.validator<Prisma.ReportInclude>()({
    operation: true,
    material: true,
    techReport: { include: { flight: true } },
    treatment: { include: { products: true } },
    call: { include: { kit: { include: { employees: true } } } },
})
