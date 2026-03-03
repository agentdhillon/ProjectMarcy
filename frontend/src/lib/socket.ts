/**
 * Socket.IO client — singleton used for real-time chat rooms and music sync.
 *
 * Usage:
 *   import { connectSocket, getSocket, disconnectSocket } from "@/lib/socket";
 *
 *   connectSocket();
 *   const socket = getSocket();
 *   socket.emit("join_room", { room_id: "abc123" });
 *   socket.on("new_message", (data) => { ... });
 */

import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket(token?: string): void {
  const s = getSocket();
  if (token) {
    s.auth = { token };
  }
  if (!s.connected) {
    s.connect();
  }
}

export function disconnectSocket(): void {
  if (socket?.connected) {
    socket.disconnect();
  }
}
