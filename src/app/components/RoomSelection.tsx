import { useState } from "react";
import { motion } from "framer-motion";
import { socket } from "../socket";
import { Card } from "./ui/card";
import { Copy, Check, Clock } from "lucide-react";

interface Props {
  playerName: string;
  onRoomJoined: (roomId: string, duration: number) => void;
}

const DURATIONS = [
  { label: "1 min", value: 60 },
  { label: "5 min", value: 300 },
  { label: "10 min", value: 600 },
  { label: "15 min", value: 900 },
  // { label: "30 min", value: 1800 },
];

export function RoomSelection({ playerName, onRoomJoined }: Props) {
  const [roomId, setRoomId] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(600);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const createRoom = () => {
    socket.emit("createRoom", { playerName, duration: selectedDuration });

    socket.once("roomCreated", (id: string) => {
      setCreatedRoomId(id);
    });
  };

  const handleJoinCreated = () => {
    if (!createdRoomId) return;
    onRoomJoined(createdRoomId, selectedDuration);
  };

  const joinRoom = () => {
    if (!roomId.trim()) return;
    setError("");
    socket.emit("joinRoom", { roomId: roomId.trim(), playerName });

    socket.once("errorMessage", (msg: string) => {
      setError(msg);
    });

    socket.once("playersUpdate", () => {
      onRoomJoined(roomId.trim(), selectedDuration);
    });
  };

  const copyRoomId = () => {
    if (!createdRoomId) return;
    navigator.clipboard.writeText(createdRoomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          🎮 Multiplayer Room
        </h2>

        {/* Créer une room */}
        <Card className="bg-slate-900/90 border-purple-500/30 p-6 space-y-4">
          <h3 className="text-white font-semibold text-lg">Créer une Room</h3>

          {/* Sélecteur de durée */}
          <div>
            <label className="text-sm text-slate-400 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Durée de la partie
            </label>
            <div className="grid grid-cols-4 gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDuration(d.value)}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all border ${
                    selectedDuration === d.value
                      ? "bg-purple-600 border-purple-400 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={createRoom}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all"
          >
            Créer une Room
          </button>

          {/* Affichage de l'ID créé */}
          {createdRoomId && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 space-y-3"
            >
              <p className="text-green-400 text-sm font-semibold">✅ Room créée !</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-800 rounded-lg px-4 py-2 font-mono text-white text-lg tracking-widest text-center">
                  {createdRoomId}
                </div>
                <button
                  onClick={copyRoomId}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all"
                  title="Copier l'ID"
                >
                  {copied
                    ? <Check className="w-5 h-5 text-green-400" />
                    : <Copy className="w-5 h-5 text-slate-300" />
                  }
                </button>
              </div>
              <p className="text-xs text-slate-400 text-center">
                Partagez cet ID avec votre équipe
              </p>
              <button
                onClick={handleJoinCreated}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all"
              >
                Rejoindre ma Room →
              </button>
            </motion.div>
          )}
        </Card>

        {/* Rejoindre une room */}
        <Card className="bg-slate-900/90 border-purple-500/30 p-6 space-y-4">
          <h3 className="text-white font-semibold text-lg">Rejoindre une Room</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Entrer ID de la room"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg font-mono tracking-widest placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={joinRoom}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
            >
              Rejoindre
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
