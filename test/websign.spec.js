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
});