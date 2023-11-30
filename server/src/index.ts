import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import WebSocket, { WebSocketServer } from "ws";
import os from 'os';

// Import your routers
import { userRouter } from './User/user.router';
import { postRouter } from './Post/post.router';
import { likeRouter } from './Like/like.route';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocketServer({
    port: 8080,
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

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    // Close the WebSocket connection on client disconnect
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

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
