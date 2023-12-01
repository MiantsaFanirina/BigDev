import { io } from "socket.io-client";

const BACKEND_URL = "http://localhost:8000"

const socket = io.connect(BACKEND_URL)

export { socket }