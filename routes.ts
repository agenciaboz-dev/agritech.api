import express, { Express, Request, Response } from "express"
import pdf from "./src/rest/pdf"

export const router = express.Router()

router.get("/", async (request: Request, response: Response) => {
    response.json({ test: true })
})

router.use("/pdf", pdf)
