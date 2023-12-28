import axios from "axios"
import { Socket } from "socket.io"

const climate = async (socket: Socket, data: any) => {
    const token = "119ddb6515ba1746ff413ff579a29fbb"
    try {
        const response = await axios.get(
            `https://agencyboz_novaes_tainara:dH1sy2W08N@api.meteomatics.com/2023-12-27T00:00:00Z/t_2m:C/-12.4214,-41.7668/json`
        )
        socket.emit("weather:cep:success", response.data.data)
        console.log(response.data)
    } catch (error) {
        socket.emit("weather:cep:failed", error)
        console.log(error)
    }
}
export default { climate }
