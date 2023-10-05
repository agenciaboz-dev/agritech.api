import express, { Request, Response } from "express"
import { getIoInstance } from "../io/socket"
import databaseHandler from "../databaseHandler"

const router = express.Router()
const prisma = databaseHandler

router.get("/", async (request: Request, response: Response) => {
    response.json({ test: "success" })
})

router.post("/login", async (request: Request, response: Response) => {
    const data = request.body

    const user = await prisma.user.login(data)
    if (user) {
        response.json({ ...user })
    }
})

export default router
