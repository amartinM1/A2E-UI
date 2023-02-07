import TcpSocket from 'react-native-tcp-socket';

// Server connection to python ML output
const port = 5000;
const host = '';

function ServerConnection({PostMessage, reload}) {
    const server = TcpSocket.createServer(function(socket) {
        socket.on('data', (data) => {
            socket.write('Echo server ' + data);
            console.log('receieved data ' + data);
            PostMessage(data, reload);
        });
    
        socket.on('error', (error) => {
            console.log('An error ocurred with client socket ', error);
        });
    
        socket.on('close', (error) => {
            console.log('Closed connection with ', socket.address());
        });
    }).listen({ port: 5000, host: '' });
    
    server.on('error', (error) => {
        console.log('An error ocurred with the server', error);
    });
    
    server.on('close', () => {
        console.log('Server closed connection');
    });
}

export default ServerConnection;
