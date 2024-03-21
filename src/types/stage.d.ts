import { Stage } from "@prisma/client";

declare interface NewStage {
    name: string
    comments: string
    date: string
    duration: string
    finish: string
    start: string
    reportId: number
}
