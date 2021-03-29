import { StartServer } from '../src//setup/startServer'

before(async function(done) {
  const server = new StartServer()
  server.start()
 
  done()
}) 