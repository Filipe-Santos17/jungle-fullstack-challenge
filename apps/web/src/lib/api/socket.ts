import { io, Socket } from 'socket.io-client';
import env from '@/constants/envs';

let socket: Socket | null = null;

export function connectSocket(userId: string): Socket {
  if (socket) return socket;

  socket = io(env.VITE_API_WS_ROUTE, {
    transports: ['websocket'],
    autoConnect: true, // permitir conexão imediata
    auth: { userId },
  });

  //socket.on('connect', () => console.log('Socket connected:', socket?.id));
  //socket.on('connect_error', (err) => console.error('Socket connect error:', err));
  //socket.on('disconnect', (reason) => console.log('Socket disconnected:', reason));

  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
