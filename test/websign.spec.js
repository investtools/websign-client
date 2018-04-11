// import { SocketIO, Server } from 'mock-socket';
import WebSign from '../src/websign';
import sha256 from 'js-sha256';
import {expect} from 'chai';
import socketio from 'socket.io';
import http from 'http';

describe('websign tests', () => {
  
  const server = http.createServer();

  function startServer() {
    server.listen(7721, 'localhost');
    const io = socketio(server);
    io.origins('*:*');
    io.on('connection', socket => {
      socket.on('sign', data => {
        console.log(socket, data)
      });
    });
  }

  function closeServer(done) {
    done()
    server.close(function () {
      console.log('server stopped');
    });
  }

  describe("when user instantiate the lib", () => {
    describe("and server is ready", () => {
      
      it('should be able to listen service-available event', (done) => {
        startServer();
        const webSign = new WebSign()
        webSign.on('service-available', err => {
          // expect(err).to.be undefined
          expect(err).to.equal(undefined)

          closeServer(done);
        }); 
      })
    })

    describe("and server is not ready", () => {
      it('should be able to listen service-unavailable event', (done) => {
        const webSign = new WebSign()
        webSign.on('service-unavailable', err => {
          expect(err.description).to.equal(503)
          closeServer(done)
        });  
      })
    })
  })


  // xdescribe("when user wants to sign one message", () => {
  //   it('should get the signed message in a promise', (done) => {
  //     const message1 = "test message 01"
  //     const hashedMessage1 = sha256(message1)

  //     new WebSign().sign(message1).then(response => {
  //       console.log("resposta da promise", response)
  //     })

  //     mockServer.emit("signed-data", {msg: message1, hash: hashedMessage1});

  //     done()
  //   });
  // });

  // describe("when user wants to sign 2 messages", () => {
  //   it('should get the signed message in a promise', (done) => {

  //     server.listen(7721, 'localhost');
  //     const io = socketio(server);
  //     io.origins('*:*');
  //     io.on('connection', socket => {
  //       socket.on('sign', data => {
  //         // cb(socket.request.headers.referer, data, socket);
  //         console.log(socket, data)
  //       });
  //     });

  //     const webSign = new WebSign()

  //     webSign.on('connect', data => {

  //       console.log(data)

  //       //encerrando o server
  //       done()
  //       server.close(function () {
  //         console.log('server stopped');
  //       });

  //     });

  //     //disparo o evento
  //     // webSign.fireTeste()

  //     // const message1 = "test message 01"
  //     // const hashedMessage1 = sha256(message1)

  //     // const message2 = "test message 02"
  //     // const hashedMessage2 = sha256(message2)

  //     // const webSign = new WebSign()

  //     // // setTimeout(() => {
  //     // //   mockServer.emit("signed-data", {msg: message1, hash: hashedMessage1})
  //     // // }, 1000);

  //     // // mockServer.emit("signed-data", {msg: message1, hash: hashedMessage1})

  //     // // mockServer.emit("signed-data", {msg: message1, hash: hashedMessage1})
      
  //     // webSign.sign(message1).then(response => {
  //     //   console.log("resposta da promise 1", response)
        
  //     // })

  //     // webSign.sign(message2).then(response => {
  //     //   console.log("resposta da promise 2", response)
  //     //   done()
  //     // })



  //     // setTimeout(() => {
  //     //   mockServer.emit("signed-data", {msg: message2, hash: hashedMessage2})
  //     // }, 1500);


      
      

      
      

      
  //   });
  // });
});