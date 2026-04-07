import { useState } from "react";
import { motion } from "framer-motion";
import { Sword, Shield as ShieldIcon, Trophy, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScoringGuide } from "./ScoringGuide";

interface WelcomeScreenProps {
  onStart: (playerName: string) => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [playerName, setPlayerName] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-blue-500/20 border border-purple-500/30 rounded-full px-6 py-2 mb-6"
          >
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-purple-300">Compétition en Temps Réel</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            AI SECURITY ARENA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl text-slate-300 mb-4"
          >
            Attaquez ou Défendez l'IA
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-slate-400 mb-12"
          >
            Un TP collaboratif où les étudiants s'affrontent en équipes
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-red-900/30 to-red-950/30 border-2 border-red-500/50 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl" />
            <Sword className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-2xl font-bold text-red-400 mb-3">
              ÉQUIPE ROUGE
            </h3>
            <p className="text-slate-300 mb-4">Les Attaquants</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-red-400">⚡</span>
                Injection de prompts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400">⚡</span>
                Jailbreaking
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400">⚡</span>
                Extraction de données
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400">⚡</span>
                Attaques adverses
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border-2 border-blue-500/50 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
            <ShieldIcon className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold text-blue-400 mb-3">
              ÉQUIPE BLEUE
            </h3>
            <p className="text-slate-300 mb-4">Les Défenseurs</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">🛡️</span>
                Détection d'attaques
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">🛡️</span>
                Filtrage de contenu
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">🛡️</span>
                Protection des données
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">🛡️</span>
                Audit de sécurité
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Scoring Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <ScoringGuide />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">Rejoindre l'Arène</h3>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <Input
              type="text"
              placeholder="Entrez votre nom ou pseudo"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                playerName.trim() &&
                onStart(playerName.trim())
              }
              className="bg-slate-800/50 border-slate-700 text-white text-lg h-14 text-center"
              maxLength={20}
            />

            <Button
              onClick={() => playerName.trim() && onStart(playerName.trim())}
              disabled={!playerName.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-14 text-lg font-semibold"
            >
              Commencer la Bataille
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-400 mb-1">4</div>
              <div className="text-sm text-slate-400">Types d'Attaques</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-400 mb-1">∞</div>
              <div className="text-sm text-slate-400">Défis</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-400 mb-1">⚡</div>
              <div className="text-sm text-slate-400">Temps Réel</div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          💡 Conseil: Choisissez un pseudo unique pour être reconnu par vos
          coéquipiers
        </motion.p>
      </div>
    </div>
  );
}
