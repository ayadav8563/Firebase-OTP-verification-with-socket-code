import io from 'socket.io-client';

export default class SocketHelper {
  static instance = SocketHelper.instance || new SocketHelper();
  options = {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
    transports: ['websocket'],
  };
  socket = io('url', this.options);


//** using function to connect the socket */
  connectToSocket = () => {
    this.socket.removeAllListeners();
    this.socket = io('url', this.options);
    this.socket.on('connect', async () => {
      if (this.socket.connected) {
        console.log(
          'Socket connect called(inHealthProvider): ',
          this.socket.id,
        )
      } else {
        this.socket.connect();
      }
    });
    this.socket.on('error', error => {
      console.log('Socket Connect Error: ', error);
    });
    this.socket.on('disconnect', () => {
      console.log('Socket disconnected.');
      this.socket.connect();
    });
  };

//Using function to disconnect the server
  disconnectFromServer = () => {
    this.socket?.disconnect();
    this.socket.removeAllListeners();
  };

///** using funtion for emit the data means send the data */}
  typingSocketEmit = data => {
    this.socket.emit('typingSend', data);
  };

  getSocket = () => {
    return this.socket;
  };
}
