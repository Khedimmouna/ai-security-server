import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle2, AlertTriangle, TrendingUp, Sparkles, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import type { Player, Attack, Defense } from '../App';
import { toast } from 'sonner';
import { 
  DEFENSE_METHODS, 
  getDefenseEffectiveness, 
  calculateDefenseSuccess,
  calculateDefensePoints,
  getEffectivenessExplanation,
  getDefenseTip,
  getBestDefenseMethod,
  type DefenseMethod
} from '../utils/defenseSystem';

interface BlueTeamPanelProps {
  player: Player;
  attacks: Attack[];
  onDefense: (defense: Omit<Defense, 'id' | 'timestamp'>) => void;
}

export function BlueTeamPanel({ player, attacks, onDefense }: BlueTeamPanelProps) {
  const [selectedAttack, setSelectedAttack] = useState<Attack | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<DefenseMethod['id'] | ''>('');
  const [justification, setJustification] = useState('');
  const [isDefending, setIsDefending] = useState(false);

  const recentAttacks = attacks.filter(a => a.success).slice(0, 10);

  const defendAttack = async () => {
    if (!selectedAttack || !selectedMethod || !justification.trim()) {
      toast.error('Complétez tous les champs avant de défendre!');
      return;
    }

    setIsDefending(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const method = DEFENSE_METHODS.find(m => m.id === selectedMethod)!;
    const result = calculateDefenseSuccess(
      selectedAttack.type, 
      selectedMethod, 
      justification.length
    );
    
    const points = calculateDefensePoints(
      result.success, 
      result.effectiveness, 
      justification.length
    );

    const explanation = getEffectivenessExplanation(
      selectedAttack.type,
      selectedMethod,
      result.effectiveness
    );

    onDefense({
      playerId: player.id,
      playerName: player.name,
      attackId: selectedAttack.id,
      method: method.name,
      success: result.success,
      points
    });

    if (result.success) {
      toast.success(`🛡️ Défense réussie! +${points} points`, {
        description: `${explanation} (Efficacité: ${result.effectiveness}%)`
      });
    } else {
      toast.error('⚠️ Défense insuffisante', {
        description: `${explanation} Essayez une autre méthode!`
      });
    }

    setSelectedAttack(null);
    setSelectedMethod('');
    setJustification('');
    setIsDefending(false);
  };

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 85) return 'text-green-400';
    if (effectiveness >= 70) return 'text-blue-400';
    if (effectiveness >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getEffectivenessBarColor = (effectiveness: number) => {
    if (effectiveness >= 85) return 'bg-green-500';
    if (effectiveness >= 70) return 'bg-blue-500';
    if (effectiveness >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Section d'aide tactique */}
      {selectedAttack && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-purple-300 font-semibold mb-1">💡 Conseil Tactique</h4>
              <p className="text-sm text-slate-300">{getDefenseTip(selectedAttack.type)}</p>
            </div>
          </div>
        </motion.div>
      )}

      <div>
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          Attaques à Défendre ({recentAttacks.length})
        </h3>

        {recentAttacks.length === 0 ? (
          <Card className="bg-green-500/10 border border-green-500/30 p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-green-300">Aucune attaque réussie pour le moment!</p>
            <p className="text-sm text-slate-400 mt-2">
              Les systèmes sont sécurisés. Restez vigilant!
            </p>
          </Card>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {recentAttacks.map((attack) => {
              const bestDefense = getBestDefenseMethod(attack.type);
              return (
                <motion.button
                  key={attack.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedAttack(attack)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAttack?.id === attack.id
                      ? 'bg-blue-500/20 border-blue-500/50'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-300 border border-red-500/30">
                        {attack.type.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-slate-400">
                        par {attack.playerName}
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        Meilleure défense: {bestDefense.name}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                      {new Date(attack.timestamp).toLocaleTimeString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 line-clamp-2 mb-2">{attack.content}</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-red-300">Attaque réussie • +{attack.points} pts pour l'équipe rouge</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedAttack && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-blue-500/10 border border-blue-500/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <div>
                  <h4 className="text-white font-semibold">Créer une Défense</h4>
                  <p className="text-sm text-slate-400">
                    Attaque type: <span className="text-red-300 font-semibold">
                      {selectedAttack.type.replace('-', ' ').toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white mb-3 block">
                    Choisissez votre Méthode de Défense:
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {DEFENSE_METHODS.map((method) => {
                      const effectiveness = getDefenseEffectiveness(selectedAttack.type, method.id);
                      const isSelected = selectedMethod === method.id;
                      const isBest = effectiveness >= 85;
                      
                      return (
                        <motion.button
                          key={method.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            isSelected
                              ? 'bg-blue-500/20 border-blue-500/50'
                              : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-semibold">{method.name}</span>
                              {isBest && (
                                <span className="px-2 py-0.5 text-xs rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  Optimal
                                </span>
                              )}
                            </div>
                            <span className={`text-sm font-bold ${getEffectivenessColor(effectiveness)}`}>
                              {effectiveness}%
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mb-2">{method.description}</p>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${effectiveness}%` }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className={`h-full rounded-full ${getEffectivenessBarColor(effectiveness)}`}
                            />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {selectedMethod && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="text-sm text-white mb-2 block">Justification Technique:</label>
                    <Textarea
                      value={justification}
                      onChange={(e) => setJustification(e.target.value)}
                      placeholder="Expliquez pourquoi cette méthode est efficace contre cette attaque... Une justification détaillée augmente vos chances de succès et peut rapporter un bonus de +40 points!"
                      className="min-h-[120px] bg-slate-800/50 border-slate-700 text-white"
                      disabled={isDefending}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-slate-400">
                        {justification.length} caractères {justification.length > 50 && '• ✅ Bonus +40 pts activé!'}
                      </p>
                      {justification.length > 50 && (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Justification détaillée
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}

                <Button
                  onClick={defendAttack}
                  disabled={!selectedMethod || !justification.trim() || isDefending}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-semibold"
                >
                  {isDefending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Déploiement de la défense...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Déployer la Défense
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-xs text-yellow-300">
                  💡 <strong>Astuce:</strong> Consultez la matrice d'efficacité! Les méthodes marquées "Optimal" 
                  ont les meilleures chances de succès. Une justification de +50 caractères rapporte un bonus de points!
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
