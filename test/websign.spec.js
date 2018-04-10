import { SocketIO, Server } from 'mock-socket';
import WebSign from '../src/websign';
import sha256 from 'js-sha256';
import {expect} from 'chai';

describe('#sign', () => {
  
  var mockServer

  beforeEach(() => {
    window.io = SocketIO;
    mockServer = new Server('http://localhost:8080');
  })
  
  afterEach(done => {
    mockServer.stop(done);
  })

  describe("when user wants to sign one message", () => {
    it('should get the signed message in a promise', (done) => {
      const message1 = "test message 01"
      const hashedMessage1 = sha256(message1)

      WebSign.sign(message1)
        .then(data => {
          expect(data.msg).to.equal(message1)
        }).catch(error => {
          console.log(error)
        });

      mockServer.emit("signed-data", {msg: message1, hash: hashedMessage1});

      done()
    });
  });
});