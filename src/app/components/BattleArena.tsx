import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, MessageSquare, Play } from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RedTeamPanel } from "./RedTeamPanel";
import { BlueTeamPanel } from "./BlueTeamPanel";
import { Leaderboard } from "./Leaderboard";
import { ActivityFeed } from "./ActivityFeed";
import { TeamChat } from "./TeamChat";
import { DefenseMatrix } from "./DefenseMatrix";
import { socket } from "../socket";
import type { Player, Attack, Defense, Message } from "../App";
import { GameOverScreen } from "./GameOverScreen";

interface BattleArenaProps {
  currentPlayer: Player;
  allPlayers: Player[];
  attacks: Attack[];
  defenses: Defense[];
  onAttack: (attack: Omit<Attack, "id" | "timestamp">) => void;
  onDefense: (defense: Omit<Defense, "id" | "timestamp">) => void;
  messages: Message[];
  onSendMessage: (text: string) => void;
  gameDuration: number;
  currentRoomId: string | null;
  gameAlreadyStarted?: boolean;
}

export function BattleArena({
  currentPlayer,
  allPlayers,
  attacks,
  defenses,
  onAttack,
  onDefense,
  messages,
  onSendMessage,
  gameDuration,
  currentRoomId,
  gameAlreadyStarted,
}: BattleArenaProps) {
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // 1er useEffect — écouter gameStarted du serveur
  useEffect(() => {
    socket.on("gameStarted", ({ duration }: { duration: number }) => {
      setTimeLeft(duration);
      setGameStarted(true);
      setGameOver(false);
    });

    return () => {
      socket.off("gameStarted");
    };
  }, []);

  // 2ème useEffect — si la partie est déjà en cours quand on rejoint
  useEffect(() => {
    if (gameAlreadyStarted) {
      setGameStarted(true);
    }
  }, [gameAlreadyStarted]);

  // 3ème useEffect — chrono venant du serveur (plus de setInterval local)
  useEffect(() => {
    socket.on("timerTick", ({ timeLeft: t }: { timeLeft: number }) => {
      setTimeLeft(t);
      if (t <= 0) setGameOver(true);
    });

    socket.on("gameOver", () => {
      setGameOver(true);
      setTimeLeft(0);
    });

    return () => {
      socket.off("timerTick");
      socket.off("gameOver");
    };
  }, []);

  const startGame = () => {
    socket.emit("startGame", { roomId: currentRoomId, duration: gameDuration });
  };

  const redTeam = allPlayers.filter((p) => p.team === "red");
  const blueTeam = allPlayers.filter((p) => p.team === "blue");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const timePercent = (timeLeft / gameDuration) * 100;
  const timerColor =
    timePercent > 50
      ? "text-green-400"
      : timePercent > 20
        ? "text-yellow-400"
        : "text-red-400";

  if (gameOver) {
    return (
      <GameOverScreen
        allPlayers={allPlayers}
        onPlayAgain={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="bg-slate-900/90 backdrop-blur-sm border-purple-500/30 p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                AI SECURITY ARENA
              </h1>
              <p className="text-slate-400">
                Joueur:{" "}
                <span
                  className={`font-semibold ${currentPlayer.team === "red" ? "text-red-400" : "text-blue-400"}`}
                >
                  {currentPlayer.name}
                </span>{" "}
                • Score:{" "}
                <span className="text-yellow-400 font-bold">
                  {currentPlayer.score}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">
                  {gameOver
                    ? "Partie terminée"
                    : gameStarted
                      ? "Temps restant"
                      : "Durée"}
                </div>
                <div
                  className={`text-2xl font-bold font-mono ${gameStarted ? timerColor : "text-white"}`}
                >
                  {formatTime(timeLeft)}
                </div>
              </div>

              <div className="h-12 w-px bg-slate-700" />

              <div className="text-center">
                {!gameStarted && !gameOver ? (
                  <button
                    onClick={startGame}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg"
                  >
                    <Play className="w-4 h-4" />
                    Commencer
                  </button>
                ) : gameOver ? (
                  <div className="px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-xl">
                    <span className="text-red-300 font-bold text-sm">
                      ⏱ Terminé !
                    </span>
                  </div>
                ) : (
                  <div className="px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-xl">
                    <span className="text-green-300 font-bold text-sm">
                      🟢 En cours
                    </span>
                  </div>
                )}
              </div>

              <div className="h-12 w-px bg-slate-700" />

              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Joueurs</div>
                <div className="text-2xl font-bold text-white">
                  {allPlayers.length}
                </div>
              </div>
            </div>
          </div>

          {gameStarted && !gameOver && (
            <div className="mt-4 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full transition-all ${
                  timePercent > 50
                    ? "bg-green-500"
                    : timePercent > 20
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${timePercent}%` }}
              />
            </div>
          )}
        </Card>
      </motion.div>

      {!gameStarted && !gameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-center"
        >
          <p className="text-yellow-300 font-semibold">
            ⏳ En attente du démarrage — Un membre peut cliquer sur{" "}
            <strong>Commencer</strong> pour lancer la partie pour tous !
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-red-500/10 border-red-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400 mb-1">⚔️ Équipe Rouge</div>
              <div className="text-3xl font-bold text-red-400">
                {redTeam.reduce((sum, p) => sum + p.score, 0)}
              </div>
              <div className="text-xs text-slate-400">pts total</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">
                {redTeam.length} joueurs
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-400 mb-1">🛡️ Équipe Bleue</div>
              <div className="text-3xl font-bold text-blue-400">
                {blueTeam.reduce((sum, p) => sum + p.score, 0)}
              </div>
              <div className="text-xs text-slate-400">pts total</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">
                {blueTeam.length} joueurs
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-slate-900/90 backdrop-blur-sm border-purple-500/30 p-6">
              <Tabs defaultValue="action" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
                  <TabsTrigger
                    value="action"
                    className="text-slate-300 data-[state=active]:text-black"
                  >
                    {currentPlayer.team === "red"
                      ? "⚔️ Attaquer"
                      : "🛡️ Défendre"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="text-slate-300 data-[state=active]:text-black"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Activité
                  </TabsTrigger>
                  <TabsTrigger
                    value="chat"
                    className="text-slate-300 data-[state=active]:text-black"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="action" className="mt-6">
                  {!gameStarted || gameOver ? (
                    <div className="text-center py-16 text-slate-400">
                      {gameOver
                        ? "⏱ La partie est terminée !"
                        : "⏳ En attente du démarrage de la partie..."}
                    </div>
                  ) : currentPlayer.team === "red" ? (
                    <RedTeamPanel player={currentPlayer} onAttack={onAttack} />
                  ) : (
                    <BlueTeamPanel
                      player={currentPlayer}
                      attacks={attacks}
                      onDefense={onDefense}
                    />
                  )}
                </TabsContent>

                <TabsContent value="activity" className="mt-6">
                  <ActivityFeed attacks={attacks} defenses={defenses} />
                </TabsContent>

                <TabsContent value="chat" className="mt-6">
                  <TeamChat
                    currentPlayer={currentPlayer}
                    teamPlayers={
                      currentPlayer.team === "red" ? redTeam : blueTeam
                    }
                    messages={messages}
                    onSendMessage={onSendMessage}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <Leaderboard
            players={allPlayers}
            currentPlayerId={currentPlayer.id}
          />
        </div>
      </div>

      <DefenseMatrix />
    </div>
  );
}
