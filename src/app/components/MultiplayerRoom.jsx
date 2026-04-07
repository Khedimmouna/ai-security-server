import { useState, useEffect } from "react";
import { socket } from "../socket";

export default function MultiplayerRoom() {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("roomCreated", (id) => {
      setRoomId(id);
      alert("Room créée : " + id);
    });

    socket.on("playersUpdate", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    socket.on("errorMessage", (msg) => {
      alert(msg);
    });

    return () => {
      socket.off("roomCreated");
      socket.off("playersUpdate");
      socket.off("errorMessage");
    };
  }, []);

  const createRoom = () => {
    socket.emit("createRoom", { playerName });
  };

  const joinRoom = () => {
    socket.emit("joinRoom", { roomId, playerName });
  };

  return (
    <div>
      <h2>🎮 Multiplayer Arena</h2>

      <input
        placeholder="Ton nom"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <div>
        <button onClick={createRoom}>Créer une Room</button>
      </div>

      <div>
        <input
          placeholder="ID de la Room"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={joinRoom}>Rejoindre</button>
      </div>

      <h3>Joueurs :</h3>
      {players.map((p) => (
        <div key={p.id}>
          {p.name} - {p.team}
        </div>
      ))}
    </div>
  );
}
