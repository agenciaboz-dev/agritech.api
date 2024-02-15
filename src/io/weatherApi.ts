import axios from "axios"
import { Socket } from "socket.io"

const climate = async (socket: Socket, data: any) => {
    const token = "HDYZ4EFPY3HGBAZCNDVBPJ5UX"
    try {
        // console.log(data.data)
        const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${data.data}?key=${token}`
        )
        const { icon } = response.data.currentConditions
        socket.emit("weather:find:success", response.data)
        console.log({ city: data.data, icon: response.data.currentConditions.icon })
    } catch (error) {
        socket.emit("weather:find:failed", error)
        console.log(error)
    }
}
export default { climate }
