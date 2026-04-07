import { motion } from "framer-motion";
import { Trophy, Sword, Shield, RotateCcw, Star } from "lucide-react";
import type { Player } from "../App";

interface GameOverScreenProps {
  allPlayers: Player[];
  onPlayAgain: () => void;
}

export function GameOverScreen({ allPlayers, onPlayAgain }: GameOverScreenProps) {
  const redTeam = allPlayers.filter((p) => p.team === "red");
  const blueTeam = allPlayers.filter((p) => p.team === "blue");
  const redScore = redTeam.reduce((sum, p) => sum + p.score, 0);
  const blueScore = blueTeam.reduce((sum, p) => sum + p.score, 0);

  const isDraw = redScore === blueScore;
  const winner = isDraw ? null : redScore > blueScore ? "red" : "blue";

  const sortedPlayers = [...allPlayers].sort((a, b) => b.score - a.score);
  const mvp = sortedPlayers[0];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Particules de fond */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            i % 2 === 0 ? "bg-red-400/30" : "bg-blue-400/30"
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300,
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            left: "50%",
            top: "50%",
          }}
        />
      ))}

      <div className="w-full max-w-2xl space-y-6 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="text-center"
        >
          <div className="text-6xl mb-3">⏱️</div>
          <h1 className="text-4xl font-bold text-white mb-2">Partie Terminée !</h1>
          <p className="text-slate-400">Les résultats sont tombés</p>
        </motion.div>

        {/* Bandeau Gagnant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
          className={`rounded-2xl p-6 text-center border-2 ${
            isDraw
              ? "bg-yellow-500/10 border-yellow-500/40"
              : winner === "red"
                ? "bg-red-500/15 border-red-500/50"
                : "bg-blue-500/15 border-blue-500/50"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className={`w-8 h-8 ${
              isDraw ? "text-yellow-400" : winner === "red" ? "text-red-400" : "text-blue-400"
            }`} />
            <span className={`text-3xl font-bold ${
              isDraw ? "text-yellow-300" : winner === "red" ? "text-red-300" : "text-blue-300"
            }`}>
              {isDraw
                ? "Égalité !"
                : winner === "red"
                  ? "🏆 Équipe Rouge Gagne !"
                  : "🏆 Équipe Bleue Gagne !"}
            </span>
          </div>
          {!isDraw && (
            <p className="text-slate-400 text-sm">
              Victoire par {Math.abs(redScore - blueScore)} points d'écart
            </p>
          )}
        </motion.div>

        {/* Scores des équipes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Équipe Rouge */}
          <div className={`rounded-xl p-5 border ${
            winner === "red"
              ? "bg-red-500/20 border-red-400/60 ring-2 ring-red-400/30"
              : "bg-red-500/10 border-red-500/30"
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <Sword className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-semibold">Équipe Rouge</span>
              {winner === "red" && <span className="text-yellow-400 text-lg">👑</span>}
            </div>
            <div className="text-4xl font-bold text-red-400 mb-1">{redScore}</div>
            <div className="text-xs text-slate-400">points total</div>
            <div className="mt-3 space-y-1">
              {redTeam.sort((a, b) => b.score - a.score).map((p) => (
                <div key={p.id} className="flex justify-between text-xs text-slate-300">
                  <span>{p.name}</span>
                  <span className="text-red-300 font-semibold">{p.score} pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Équipe Bleue */}
          <div className={`rounded-xl p-5 border ${
            winner === "blue"
              ? "bg-blue-500/20 border-blue-400/60 ring-2 ring-blue-400/30"
              : "bg-blue-500/10 border-blue-500/30"
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-semibold">Équipe Bleue</span>
              {winner === "blue" && <span className="text-yellow-400 text-lg">👑</span>}
            </div>
            <div className="text-4xl font-bold text-blue-400 mb-1">{blueScore}</div>
            <div className="text-xs text-slate-400">points total</div>
            <div className="mt-3 space-y-1">
              {blueTeam.sort((a, b) => b.score - a.score).map((p) => (
                <div key={p.id} className="flex justify-between text-xs text-slate-300">
                  <span>{p.name}</span>
                  <span className="text-blue-300 font-semibold">{p.score} pts</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* MVP */}
        {mvp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400/50 flex-shrink-0">
              <img src={mvp.avatar} alt={mvp.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 font-bold text-sm">MVP de la partie</span>
              </div>
              <div className="text-white font-bold text-lg">{mvp.name}</div>
              <div className="text-xs text-slate-400">
                {mvp.team === "red" ? "Équipe Rouge" : "Équipe Bleue"} • {mvp.score} pts
              </div>
            </div>
            <div className="text-4xl">🏅</div>
          </motion.div>
        )}

        {/* Bouton rejouer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <button
            onClick={onPlayAgain}
            className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all text-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Rejouer
          </button>
        </motion.div>
      </div>
    </div>
  );
}
