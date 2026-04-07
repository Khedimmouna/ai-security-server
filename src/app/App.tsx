import { useState, useEffect } from "react";
import { socket } from "./socket";
import { RoomSelection } from "./components/RoomSelection";
import { Toaster } from "./components/ui/sonner";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { BattleArena } from "./components/BattleArena";
import { TeamSelection } from "./components/TeamSelection";

export type Team = "red" | "blue" | null;

export interface Message {
  id: string;
  playerId: string;
  playerName: string;
  content: string;
  timestamp: number;
}

export interface Player {
  id: string;
  name: string;
  team: Team;
  score: number;
  avatar: string;
}

export interface Attack {
  id: string;
  playerId: string;
  playerName: string;
  type: "prompt-injection" | "jailbreak" | "data-leak" | "adversarial";
  content: string;
  success: boolean;
  points: number;
  timestamp: number;
}

export interface Defense {
  id: string;
  playerId: string;
  playerName: string;
  attackId: string;
  method: string;
  success: boolean;
  points: number;
  timestamp: number;
}

function App() {
  const [gameState, setGameState] = useState<
    "welcome" | "room" | "team-selection" | "battle"
  >("welcome");

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [defenses, setDefenses] = useState<Defense[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [gameDuration, setGameDuration] = useState(600);
  const [gameAlreadyStarted, setGameAlreadyStarted] = useState(false);

  useEffect(() => {
    // Mise à jour des joueurs
    socket.on("playersUpdate", (serverPlayers: any[]) => {
      const formattedPlayers = serverPlayers.map((p) => ({
        id: p.id,
        name: p.name,
        team: p.team,
        score: p.score ?? 0, // ← prend le score du serveur au lieu de forcer 0
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`,
      }));

      setAllPlayers(formattedPlayers);

      // Mettre à jour aussi le currentPlayer si il est dans la liste
      setCurrentPlayer((prev) => {
        if (!prev) return null;
        const updated = formattedPlayers.find((p) => p.name === prev.name);
        return updated ? { ...prev, score: updated.score } : prev;
      });
    });

    socket.on("newTeamMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // 🔥 réception d'une nouvelle attaque
    socket.on("newAttack", (attack: Attack) => {
      setAttacks((prev) => [attack, ...prev].slice(0, 50));
    });

    socket.on(
      "roomState",
      ({ duration, started }: { duration: number; started: boolean }) => {
        setGameDuration(duration);
        if (started) {
          // Signaler à BattleArena que la partie est déjà en cours
          setGameAlreadyStarted(true);
        }
      },
    );

    return () => {
      socket.off("playersUpdate");
      socket.off("newAttack");
      socket.off("newTeamMessage");
      socket.off("roomState");
    };
  }, []);
  // **PLUS DE BOTS AUTOMATIQUES**

  const handlePlayerJoin = (name: string) => {
    const player: Player = {
      id: `player-${Date.now()}`,
      name,
      team: null,
      score: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };

    setCurrentPlayer(player);

    // 👇 Au lieu d'aller direct au team-selection
    setGameState("room");
  };

  const handleTeamSelect = (team: Team) => {
    if (!currentPlayer || !team) return;

    // envoyer le choix au serveur
    socket.emit("selectTeam", { team });

    const updatedPlayer = { ...currentPlayer, team };

    setCurrentPlayer(updatedPlayer);

    setAllPlayers((prev) =>
      prev.map((p) => (p.id === currentPlayer.id ? updatedPlayer : p)),
    );

    setGameState("battle");
  };

  const handleAttack = (attack: Omit<Attack, "id" | "timestamp">) => {
    const newAttack: Attack = {
      ...attack,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    socket.emit("sendAttack", { roomId: currentRoomId, attack: newAttack });
    setAttacks((prev) => [newAttack, ...prev].slice(0, 50));

    // ✅ Mettre à jour le score localement
    setCurrentPlayer((prev) => {
      if (!prev) return prev;
      return { ...prev, score: prev.score + newAttack.points };
    });
    setAllPlayers((prev) =>
      prev.map((p) =>
        p.name === currentPlayer?.name
          ? { ...p, score: p.score + newAttack.points }
          : p,
      ),
    );
  };

  const handleDefense = (defense: Omit<Defense, "id" | "timestamp">) => {
    const newDefense: Defense = {
      ...defense,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    setDefenses((prev) => [newDefense, ...prev].slice(0, 50));

    socket.emit("sendDefense", {
      roomId: currentRoomId,
      defense: newDefense,
    });

    // ✅ Mettre à jour le score localement
    setCurrentPlayer((prev) => {
      if (!prev) return prev;
      return { ...prev, score: prev.score + newDefense.points };
    });

    setAllPlayers((prev) =>
      prev.map((p) =>
        p.name === currentPlayer?.name
          ? { ...p, score: p.score + newDefense.points }
          : p,
      ),
    );
  }; // ← une seule accolade fermante ici

  // function handleSendMessage(text: string) {
  //   if (!currentPlayer || !currentRoomId) return;

  //   const message: Message = {
  //     id: crypto.randomUUID(),
  //     playerId: currentPlayer.id,
  //     playerName: currentPlayer.name,
  //     content: text,
  //     timestamp: Date.now(),
  //   };

  //   socket.emit("teamMessage", {
  //     roomId: currentRoomId,
  //     team: currentPlayer.team,
  //     message,
  //   });
  // }

  const sendTeamMessage = (text: string) => {
    if (!currentPlayer || !currentRoomId) return;

    const message: Message = {
      id: crypto.randomUUID(),
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      content: text,
      timestamp: Date.now(),
    };

    // Envoi au serveur
    socket.emit("teamMessage", {
      roomId: currentRoomId,
      team: currentPlayer.team,
      message,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Toaster position="top-right" />

      {gameState === "welcome" && <WelcomeScreen onStart={handlePlayerJoin} />}

      {gameState === "room" && currentPlayer && (
        // Changer la signature
        <RoomSelection
          playerName={currentPlayer.name}
          onRoomJoined={(roomId: string, duration: number) => {
            setCurrentRoomId(roomId);
            setGameDuration(duration); // ← ajouter ça
            setGameState("team-selection");
          }}
        />
      )}

      {gameState === "team-selection" && currentPlayer && (
        <TeamSelection player={currentPlayer} onTeamSelect={handleTeamSelect} />
      )}

      {gameState === "battle" && currentPlayer && (
        <BattleArena
          currentPlayer={currentPlayer}
          allPlayers={allPlayers}
          attacks={attacks}
          defenses={defenses}
          onAttack={handleAttack}
          onDefense={handleDefense}
          messages={messages} // <--- nouveau
          onSendMessage={sendTeamMessage} // <--- callback
          gameDuration={gameDuration} // ← ajouter
          currentRoomId={currentRoomId} // ← ajouter
          gameAlreadyStarted={gameAlreadyStarted}
        />
      )}
    </div>
  );
}

export default App;
