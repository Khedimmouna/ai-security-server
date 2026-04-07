import { motion } from "framer-motion";
import { Sword, Shield as ShieldIcon, Users, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Player, Team } from "../App";

interface TeamSelectionProps {
  player: Player;
  onTeamSelect: (team: Team) => void;
}

export function TeamSelection({ player, onTeamSelect }: TeamSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-6 py-2 mb-6">
            <Users className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300">Bienvenue {player.name}!</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Choisissez Votre Équipe
          </h1>
          <p className="text-xl text-slate-400">
            Attaquez l'IA ou défendez-la contre les menaces
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Red Team Card */}
          ```tsx
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <Card className="bg-gradient-to-br from-red-900/40 to-red-950/40 border-2 border-red-500/50 hover:border-red-400 transition-all p-8 h-full relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-red-500/20 p-6 rounded-full border-2 border-red-500/50"
                  >
                    <Sword className="w-16 h-16 text-red-400" />
                  </motion.div>
                </div>

                <h2 className="text-4xl font-bold text-red-400 mb-3 text-center">
                  ÉQUIPE ROUGE
                </h2>

                <p className="text-2xl text-red-300 mb-6 text-center">
                  Les Attaquants
                </p>

                <div className="space-y-3 mb-8">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">
                      🎯 Objectif
                    </h3>
                    <p className="text-sm text-slate-300">
                      Contourner les défenses de l'IA et exploiter ses
                      vulnérabilités
                    </p>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">
                      ⚡ Missions
                    </h3>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• Injection de prompts malveillants</li>
                      <li>• Jailbreaking du modèle</li>
                      <li>• Extraction de données sensibles</li>
                      <li>• Création d'exemples adverses</li>
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">🏆 Points</h3>
                    <p className="text-sm text-slate-300">
                      +100 pts par attaque réussie <br />
                      +50 pts bonus pour les techniques avancées
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => onTeamSelect("red")}
                  className="w-full bg-red-600 hover:bg-red-700 h-14 text-lg font-semibold"
                >
                  Rejoindre l'Équipe Rouge
                  <Sword className="w-5 h-5 ml-2" />
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Difficulté: Créative & Offensive
                </div>
              </div>
            </Card>
          </motion.div>
          {/* Blue Team Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => onTeamSelect("blue")}
          >
            <Card className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 border-2 border-blue-500/50 hover:border-blue-400 transition-all p-8 h-full relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-blue-500/20 p-6 rounded-full border-2 border-blue-500/50"
                  >
                    <ShieldIcon className="w-16 h-16 text-blue-400" />
                  </motion.div>
                </div>

                <h2 className="text-4xl font-bold text-blue-400 mb-3 text-center">
                  ÉQUIPE BLEUE
                </h2>
                <p className="text-2xl text-blue-300 mb-6 text-center">
                  Les Défenseurs
                </p>

                <div className="space-y-3 mb-8">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">
                      🎯 Objectif
                    </h3>
                    <p className="text-sm text-slate-300">
                      Protéger l'IA et détecter les tentatives d'exploitation
                    </p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">
                      🛡️ Missions
                    </h3>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• Détecter les injections</li>
                      <li>• Bloquer les jailbreaks</li>
                      <li>• Sécuriser les données</li>
                      <li>• Audit de robustesse</li>
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">🏆 Points</h3>
                    <p className="text-sm text-slate-300">
                      +80 pts par attaque bloquée
                      <br />
                      +40 pts pour solutions innovantes
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-semibold">
                  Rejoindre l'Équipe Bleue
                  <ShieldIcon className="w-5 h-5 ml-2" />
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Difficulté: Analytique & Défensive
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 inline-block">
            <p className="text-yellow-300 text-sm">
              💡 <strong>Astuce:</strong> Les deux équipes sont essentielles !
              L'équipe rouge identifie les failles, l'équipe bleue les corrige.
              Choisissez selon vos préférences !
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
