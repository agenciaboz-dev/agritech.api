import { ReportClosingType } from "../databaseHandler/report"

export interface PdfFormOptions {
    template_path: string
    output_path: string
    font?: {
        regular: string
        bold: string
    }
    report: ReportClosingType
}

export interface PdfField {
    name: string
    value: string | number
    bold?: boolean
}
