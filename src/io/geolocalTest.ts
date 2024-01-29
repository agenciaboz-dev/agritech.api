import axios from "axios"
import { Socket } from "socket.io"
const coordinateCep = async (socket: Socket, data: any) => {
    try {
        const cep = data.data
        const response = await axios.get(`https://www.cepaberto.com/api/v3/cep?cep=${cep}`, {
            headers: { Authorization: `Token token=58e973c730ad8f3684584e19e68b6044` },
        })
        if (Object.keys(response.data).length !== 0) {
            socket.emit("coordinate:cep:success", response.data)
            console.log(response.data)
        } else {
            socket.emit("coordinate:cep:empty", response.data)
            console.log(response.data)
        }
    } catch (error) {
        // console.error(error)
        socket.emit("coordinate:cep:error")
    }
}

export default { coordinateCep }
