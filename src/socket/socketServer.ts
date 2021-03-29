const socketIO = require('socket.io')

class SocketServerClass {

  private static instance: SocketServerClass
  private io: any

  public static getInstance(): SocketServerClass {
    if (!SocketServerClass.instance) {
        SocketServerClass.instance = new SocketServerClass();
    }

    return SocketServerClass.instance
  }

  public createServer(server: any): void {
    this.io = socketIO(server, {
      cors: {
        origin: "*"
      }
    })
      
    this.io.on('connection', (socket: any) => {
      socket.on('disconnect', () => console.log('Client disconnected'));
      socket.on('join', function(userId: string) {
        socket['userId'] = userId
        console.log(userId)
      })
    })
  }

  async sendMessage(userId: String) {
    this.io.sockets.sockets.forEach(function (client: any) {
        if (client.userId == userId) {
          client.emit('newMessage', 'NewMessage')
        }
      })
  }

}

export const SocketServer = SocketServerClass.getInstance()