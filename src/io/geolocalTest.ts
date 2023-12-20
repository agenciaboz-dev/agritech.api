import axios from "axios"
import { Socket } from "socket.io"
const coordinate = async (socket: Socket, data: any) => {
    try {
        const cep = data.data
        const response = await axios.get(`https://www.cepaberto.com/api/v3/cep?cep=${cep}`, {
            headers: { Authorization: `Token token=58e973c730ad8f3684584e19e68b6044` },
        })
        socket.emit("coordinate:cep:success", response.data)
        console.log(response)
    } catch (error) {
        console.error(error)
        socket.emit("coordinate:cep:error")
    }
}

export default { coordinate }
