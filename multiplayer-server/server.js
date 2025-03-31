const http = require('http');
const { Server } = require('socket.io');

/** 
 * Class to track each connected player (id + position)
 */
class Player {
    constructor(id) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}

const server = http.createServer();

// Configure Socket.IO with CORS
const io = new Server(server, {
    cors: {
        // If you only want to allow PlayCanvas launch domain:
        // origin: "https://launch.playcanvas.com",

        // Or allow all origins (less secure, but quick for testing)
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const players = {};

/**
 * Handle new socket connections
 */
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Fired when the client is ready to initialize their Player object
    socket.on('initialize', () => {
        const newPlayer = new Player(socket.id);
        players[socket.id] = newPlayer;

        // Send to this client its own ID and the current list of players
        socket.emit('playerData', { id: socket.id, players });

        // Tell everyone else about this new player
        socket.broadcast.emit('playerJoined', newPlayer);
    });

    // This segment is for voice chat
    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });
    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });
    socket.on('ice-candidate', (candidate) => {
        socket.broadcast.emit('ice-candidate', candidate);
    });

    // Update player position
    socket.on('positionUpdate', (data) => {
        if (!players[socket.id]) return;
        players[socket.id].x = data.x;
        players[socket.id].y = data.y;
        players[socket.id].z = data.z;

        // Broadcast updated position to all other players
        socket.broadcast.emit('playerMoved', {
            id: socket.id,
            x: data.x,
            y: data.y,
            z: data.z
        });
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        if (!players[socket.id]) return;
        delete players[socket.id];
        // Notify other players to remove this player
        socket.broadcast.emit('killPlayer', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
