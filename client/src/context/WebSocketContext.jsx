import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            setSocket(ws);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setSocket(null);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ socket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

export { WebSocketProvider, useWebSocket };