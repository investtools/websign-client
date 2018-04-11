import sha256 from 'js-sha256';
import io from 'socket.io-client'
import EventEmitter from 'event-emitter-es6'


class WebSign extends EventEmitter {
  constructor() {
    super()

    var socket = io('http://127.0.0.1:7721')
    let that = this
    socket.on('connect', function(err) {
      that.emit('service-available', err);
    });

    socket.io.on('connect_error', function(err) {
      that.emit('service-unavailable', err);
    })
    //   this.emit('teste', {data: 'retorno'});
    //   console.log("testeeeeee do connect")
    // });

    // var socket = io('http://127.0.0.1:7721')

    // socket.io.on('connect_error', function(err) {
    //   console.log("DEU RUIM NA CONEXAO COM O SERVER");
    // })
    // socket.on('connect', function(err) {
    //   console.log("CONECTEI NO SERVER");
    // })
    // socket.on('signed data', data => {
    //   console.log("ASSINEI A MENSAGEM");
    // })

    // this.promises = {}
    // this.socket = io('http://localhost:7721');
    // this.socket.on('signed-data', signedData => {
    //   console.log("lalalala")
    //   // console.log("aqui dentro", signedData)
    //   // console.log(this.promises[signedData.hash])
    //   // console.log(Object.getPrototypeOf(this.promises[signedData.hash]))
    //   // this.promises[signedData.hash].thenResolve(signedData)
    //   // this.promises[signedData.hash].resolve(signedData)
    // });
  }

  sign(data) {
    // console.log(data)
    //aqui devo fazer a chamada ao server real
    // let hashedData = sha256(data)
    // let deferred = Q.defer()
    // this.promises[hashedData] = deferred.promise
    // // this.mockServer()
    // this.socket.emit("signed-data", {msg: data, hash:hashedData})
    // return deferred.promise
  }

  mockServer(data, hashedData) {
    console.log(this.socket.io)
    this.socket.emit("signed-data", {msg: data, hash:hashedData})
  }
}

export default WebSign