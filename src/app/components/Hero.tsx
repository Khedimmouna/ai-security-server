import { Shield, AlertTriangle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-purple-950/50 py-24 px-4">
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-6 py-2 mb-8"
        >
          <Shield className="w-5 h-5 text-purple-400" />
          <span className="text-purple-300">Démonstration Interactive</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          Sécurité de l'IA Générative
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto"
        >
          Explorez les vulnérabilités et les techniques d'attaque des modèles d'IA générative à travers des démonstrations interactives en temps réel
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
            <AlertTriangle className="w-8 h-8 text-red-400 mb-3 mx-auto" />
            <h3 className="text-white mb-2">Vulnérabilités</h3>
            <p className="text-sm text-slate-400">Découvrez les failles de sécurité courantes</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
            <Lock className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
            <h3 className="text-white mb-2">Attaques</h3>
            <p className="text-sm text-slate-400">Testez différentes techniques d'exploitation</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
            <Shield className="w-8 h-8 text-green-400 mb-3 mx-auto" />
            <h3 className="text-white mb-2">Protection</h3>
            <p className="text-sm text-slate-400">Apprenez les meilleures pratiques</p>
          </div>
        </motion.div>
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}
