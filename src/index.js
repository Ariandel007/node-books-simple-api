const http = require('http');
const app = require('./app');

const port = process.env.PORT;

/*Si bien más abajo podriamos hacer app.listen usando un servidor express, lo haremos de este modo
para una futura integracion con socket.io, ya que este ultimo estara esperando un servidor creado
por la api http de node y no uno de express*/
const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server is running on port', port);
});