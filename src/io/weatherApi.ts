import axios from "axios"
import { Socket } from "socket.io"

const climate = async (socket: Socket, city: any) => {
    const token = "HDYZ4EFPY3HGBAZCNDVBPJ5UX"
    try {
        const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.data}?key=${token}`
        )
        const { icon } = response.data.currentConditions
        socket.emit("weather:find:success", response.data)
    } catch (error) {
        socket.emit("weather:find:failed", error)
        console.log(error)
    }
}
export default { climate }
