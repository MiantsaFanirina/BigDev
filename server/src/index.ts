// index.ts
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import os from 'os';


// router
import { userRouter } from './User/user.router';

// config
dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);
const app = express();

// cors
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());

// Routes
app.use('/', userRouter);





// start server
app.listen(PORT, () => {
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

    console.log(`Server running on:`);
    console.log(`local: http://localhost:${PORT}`);
    console.log(`host: http://${ipv4Addresses[1]}:${PORT}`);
    console.log(`Press CTRL + C to stop server`);
});
