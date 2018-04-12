// import { SocketIO, Server } from 'mock-socket';
import WebSign from '../src/websign';
import sha256 from 'js-sha256';
import {expect} from 'chai';
import socketio from 'socket.io';
import http from 'http';

describe('websign tests', () => {
  
  const server = http.createServer();
  let globalSocket = null;
  let webSign = null;

  function startServer() {
    server.listen(7721, 'localhost');
    const io = socketio(server);
    io.origins('*:*');
    io.on('connection', socket => {
      globalSocket = socket
      socket.on('sign', data => {
        const signedData = sha256(data)
        socket.emit('signed data', signedData)
      });
    });

    webSign = new WebSign()
  }

  function closeServer(done) {
    done()
    server.close(() => {
      console.log('server stopped');
    });
    webSign.destroy();
  }

  describe("when user instantiate the lib", () => {
    describe("and server is ready", () => {
      it('should be able to listen service-available event', (done) => {
        startServer();
        
        webSign.on('service-available', err => {
          expect(err).to.equal(undefined)
          closeServer(done);
        }); 
      })


      it('should be able to listen signed-data event', (done) => {
        
        const data = "test-message"
        const expectedSignedData = sha256(data)

        startServer();

        webSign.on('signed-data', response => {
          expect(response).to.equal(expectedSignedData)
          closeServer(done);
        }); 

        webSign.sign(data)
      })
    })

    describe("and server is not ready", () => {
      it('should be able to listen service-unavailable event', (done) => {
        startServer();
        webSign.on('service-unavailable', err => {
          expect(err.description).to.equal(503)
          closeServer(done)
        });

        globalSocket.emit('connect_error')
      })
    })
  })
});