import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import os from 'os';
import bodyParser from 'body-parser';

// SOCKET.IO
import { Server } from 'socket.io';

// Import your routers
import { userRouter } from './User/user.router';
import { postRouter } from './Post/post.router';
import { likeRouter } from './Like/like.router';
import { mediaRouter } from './Media/media.router';

dotenv.config();


if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);
const app = express();
// Increase the payload size limit (e.g., 10MB)
app.use(express.json({ limit: '10mb' }));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Create an HTTP server
const server = http.createServer(app);

// Create the Socket.IO server
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST'],
    },
});

// listening user connnected to the socket
io.on("connection", (socket) => {
    console.log(`User connected to the socket with id: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    // listen for post update
    socket.on("postUpdate", (data: any) => {
        socket.broadcast.emit("postIsUpdated", data);
    });

    // listen for like update
    socket.on("likeUpdate", (data: any) => {
        socket.broadcast.emit("likeIsUpdated", data);
    });

});

// CORS middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    
    credentials: true,
}));

app.use(express.json());

// Routes
app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', likeRouter);
app.use('/', mediaRouter);

//static folder
app.use(express.static('medias'));

// Start the server
server.listen(PORT, () => {
    const networkInterfaces = os.networkInterfaces();
    const ipv4Addresses: string[] = [];

    // Iterate over network interfaces
    Object.keys(networkInterfaces).forEach((key) => {
        networkInterfaces[key]?.forEach((interfaceInfo) => {
            if (interfaceInfo.family === 'IPv4') {
                ipv4Addresses.push(interfaceInfo.address);
            }
        });
    });

    console.log('Server running on:');
    console.log(`local: http://localhost:${PORT}`);
    console.log(`host: http://${ipv4Addresses[1]}:${PORT}`);
    console.log('Press CTRL + C to stop server');
});
