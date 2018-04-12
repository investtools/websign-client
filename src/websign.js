import io from 'socket.io-client';
import EventEmitter from 'event-emitter-es6';

export default class WebSign extends EventEmitter {
  constructor() {
    super();
    this.socket = io('http://127.0.0.1:7721');

    let that = this;

    this.socket.on('connect', err => {
      that.emit('service-available', err);
    });
    this.socket.io.on('connect_error', err => {
      that.emit('service-unavailable', err);
    });
    this.socket.on('signed data', data => {
      that.emit('signed-data', data);
    });
  }

  sign(data) {
    this.socket.emit('sign', data);
  }
}

