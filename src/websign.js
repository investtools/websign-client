import sha256 from 'js-sha256';
import { WebSocket, Server, SocketIO } from 'mock-socket';

class WebSign {
  sign(data) {
    return new Promise((resolve, reject) => {
        //conecto no socket io
        const socket = new SocketIO('http://localhost:8080');
        //registro o ouvinte
        socket.on('signed-data', signedData => {
          console.log("aqui dentro", signedData)
          resolve(signedData)
        });

        //aqui devo fazer a chamada ao server real
        let hashedData = sha256(data)

    });
  }
}

export default new WebSign()