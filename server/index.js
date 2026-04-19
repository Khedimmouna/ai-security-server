const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// 🔥 CORS corrigé pour Netlify
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = {};

function getRoomId(socket) {
  return socket.currentRoomId || null;
}

io.on("connection", (socket) => {
  console.log("Nouvelle connexion :", socket.id);

  // ─── Créer une room ─────────────────────────
  socket.on("createRoom", ({ playerName, duration }) => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    socket.join(roomId);
    socket.currentRoomId = roomId;

    rooms[roomId] = {
      players: [{ id: socket.id, name: playerName, team: null, score: 0 }],
      duration: duration || 600,
      started: false,
    };

    socket.emit("roomCreated", roomId);
    io.to(roomId).emit("playersUpdate", rooms[roomId].players);
  });

  // ─── Rejoindre une room ─────────────────────
  socket.on("joinRoom", ({ roomId, playerName }) => {
    if (!rooms[roomId]) {
      socket.emit("errorMessage", "Room introuvable");
      return;
    }

    socket.join(roomId);
    socket.currentRoomId = roomId;

    rooms[roomId].players.push({
      id: socket.id,
      name: playerName,
      team: null,
      score: 0,
    });

    io.to(roomId).emit("playersUpdate", rooms[roomId].players);

    socket.emit("roomState", {
      duration: rooms[roomId].duration,
      started: rooms[roomId].started,
      timeLeft: rooms[roomId].timeLeft ?? rooms[roomId].duration,
    });
  });

  // ─── Sélection équipe ───────────────────────
  socket.on("selectTeam", ({ team }) => {
    const roomId = getRoomId(socket);
    if (!roomId || !rooms[roomId]) return;

    const player = rooms[roomId].players.find((p) => p.id === socket.id);
    if (player) {
      player.team = team;
      io.to(roomId).emit("playersUpdate", rooms[roomId].players);
    }
  });

  // ─── Start game ─────────────────────────────
  socket.on("startGame", ({ roomId, duration }) => {
    const rid = roomId || getRoomId(socket);
    if (!rid || !rooms[rid]) return;

    rooms[rid].started = true;
    rooms[rid].timeLeft = duration || rooms[rid].duration;

    io.to(rid).emit("gameStarted", {
      duration: rooms[rid].duration,
      timeLeft: rooms[rid].timeLeft,
    });

    rooms[rid].timer = setInterval(() => {
      if (!rooms[rid]) return clearInterval(rooms[rid]?.timer);

      rooms[rid].timeLeft -= 1;
      io.to(rid).emit("timerTick", { timeLeft: rooms[rid].timeLeft });

      if (rooms[rid].timeLeft <= 0) {
        clearInterval(rooms[rid].timer);
        io.to(rid).emit("gameOver");
      }
    }, 1000);
  });

  // ─── Attaque ────────────────────────────────
  socket.on("sendAttack", ({ roomId, attack }) => {
    const rid = roomId || getRoomId(socket);
    if (!rid || !rooms[rid]) return;

    const player = rooms[rid].players.find((p) => p.name === attack.playerName);

    if (player) {
      player.score = (player.score ?? 0) + attack.points;
    }

    io.to(rid).emit("newAttack", attack);
    io.to(rid).emit("playersUpdate", rooms[rid].players);
  });

  // ─── Défense ───────────────────────────────
  socket.on("sendDefense", ({ roomId, defense }) => {
    const rid = roomId || getRoomId(socket);
    if (!rid || !rooms[rid]) return;

    const player = rooms[rid].players.find(
      (p) => p.name === defense.playerName,
    );

    if (player) {
      player.score = (player.score ?? 0) + defense.points;
    }

    io.to(rid).emit("playersUpdate", rooms[rid].players);
  });

  // ─── Message équipe ────────────────────────
  socket.on("teamMessage", ({ roomId, team, message }) => {
    const rid = roomId || getRoomId(socket);
    if (!rid || !rooms[rid]) return;

    const roomPlayers = rooms[rid].players.filter((p) => p.team === team);
    roomPlayers.forEach((p) => {
      io.to(p.id).emit("newTeamMessage", message);
    });
  });

  // ─── Déconnexion ───────────────────────────
  socket.on("disconnect", () => {
    console.log("Déconnexion :", socket.id);

    const roomId = getRoomId(socket);
    if (roomId && rooms[roomId]) {
      rooms[roomId].players = rooms[roomId].players.filter(
        (p) => p.id !== socket.id,
      );
      io.to(roomId).emit("playersUpdate", rooms[roomId].players);

      if (rooms[roomId].players.length === 0) {
        delete rooms[roomId];
        console.log(`Room ${roomId} supprimée`);
      }
    }
  });
});

// 🔥 PORT dynamique pour Render
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("Serveur lancé sur port " + PORT);
});
