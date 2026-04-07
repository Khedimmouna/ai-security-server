import { motion } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useState } from 'react';
import { DEFENSE_EFFECTIVENESS, DEFENSE_METHODS } from '../utils/defenseSystem';

const ATTACK_TYPES = [
  { id: 'prompt-injection' as const, name: 'Injection de Prompt', icon: '💉' },
  { id: 'jailbreak' as const, name: 'Jailbreak', icon: '🔓' },
  { id: 'data-leak' as const, name: 'Extraction de Données', icon: '📊' },
  { id: 'adversarial' as const, name: 'Attaque Adverse', icon: '🎭' }
];

export function DefenseMatrix() {
  const [isOpen, setIsOpen] = useState(false);

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 85) return 'bg-green-500/80 text-white';
    if (effectiveness >= 70) return 'bg-blue-500/80 text-white';
    if (effectiveness >= 50) return 'bg-yellow-500/80 text-gray-900';
    return 'bg-red-500/80 text-white';
  };

  return (
    <>
      {/* Floating Help Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all"
          title="Matrice d'Efficacité des Défenses"
        >
          <HelpCircle className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Matrix Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="bg-slate-900 border-purple-500/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    🎯 Matrice d'Efficacité des Défenses
                  </h2>
                  <p className="text-slate-400">
                    Consultez cette matrice pour choisir la meilleure défense contre chaque type d'attaque
                  </p>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  className="h-10 w-10 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-purple-500/30">
                      <th className="text-left p-3 text-slate-300 font-semibold">
                        Type d'Attaque ↓ / Défense →
                      </th>
                      {DEFENSE_METHODS.map((method) => (
                        <th key={method.id} className="p-3 text-center text-slate-300 font-semibold text-sm">
                          {method.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ATTACK_TYPES.map((attack) => (
                      <tr key={attack.id} className="border-b border-slate-700/50">
                        <td className="p-3 text-white font-semibold">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{attack.icon}</span>
                            <span>{attack.name}</span>
                          </div>
                        </td>
                        {DEFENSE_METHODS.map((method) => {
                          const effectiveness = DEFENSE_EFFECTIVENESS[attack.id][method.id];
                          return (
                            <td key={method.id} className="p-3 text-center">
                              <div
                                className={`inline-flex items-center justify-center w-16 h-10 rounded-lg font-bold text-sm ${getEffectivenessColor(effectiveness)}`}
                              >
                                {effectiveness}%
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {ATTACK_TYPES.map((attack) => (
                  <Card key={attack.id} className="bg-slate-800/50 border-slate-700 p-4">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <span className="text-2xl">{attack.icon}</span>
                      {attack.name}
                    </h3>
                    <div className="space-y-2">
                      {DEFENSE_METHODS.map((method) => {
                        const effectiveness = DEFENSE_EFFECTIVENESS[attack.id][method.id];
                        return (
                          <div key={method.id} className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">{method.name}</span>
                            <span
                              className={`inline-flex items-center justify-center px-3 py-1 rounded-lg font-bold text-sm ${getEffectivenessColor(effectiveness)}`}
                            >
                              {effectiveness}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <h3 className="text-white font-semibold mb-3">📖 Légende</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500"></div>
                    <span className="text-sm text-slate-300">≥85% Optimal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-500"></div>
                    <span className="text-sm text-slate-300">≥70% Bon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-500"></div>
                    <span className="text-sm text-slate-300">≥50% Moyen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-500"></div>
                    <span className="text-sm text-slate-300">&lt;50% Faible</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <h3 className="text-purple-300 font-semibold mb-2">💡 Conseils Stratégiques</h3>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>• <strong>Équipe Bleue:</strong> Choisissez toujours la défense avec le meilleur score (vert)</li>
                  <li>• Une justification détaillée peut compenser une défense sous-optimale</li>
                  <li>• Les défenses marquées "Optimal" ont {">"} 85% d'efficacité</li>
                  <li>• Combinez plusieurs défenses en pratique réelle (défense en profondeur)</li>
                </ul>
              </div>

              <div className="mt-4 text-center">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Fermer la Matrice
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
