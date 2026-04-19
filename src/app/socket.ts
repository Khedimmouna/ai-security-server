import { io } from "socket.io-client";

export const socket =io("https://ai-security-server.onrender.com", {
  autoConnect: true,
});
