import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import type { Attack, Defense } from '../App';

interface ActivityFeedProps {
  attacks: Attack[];
  defenses: Defense[];
}

export function ActivityFeed({ attacks, defenses }: ActivityFeedProps) {
  // Combine and sort by timestamp
  const activities = [
    ...attacks.map(a => ({ ...a, activityType: 'attack' as const })),
    ...defenses.map(d => ({ ...d, activityType: 'defense' as const }))
  ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 20);

  const getActivityColor = (activity: typeof activities[0]) => {
    if (activity.activityType === 'attack') {
      return activity.success ? 'border-red-500/50 bg-red-500/10' : 'border-slate-700 bg-slate-800/50';
    } else {
      return activity.success ? 'border-blue-500/50 bg-blue-500/10' : 'border-slate-700 bg-slate-800/50';
    }
  };

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-purple-400" />
        <h3 className="text-white font-semibold">Fil d'Activité en Temps Réel</h3>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Aucune activité pour le moment</p>
          <p className="text-sm mt-2">Soyez le premier à lancer une action!</p>
        </div>
      ) : (
        <AnimatePresence>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-lg border ${getActivityColor(activity)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  activity.activityType === 'attack'
                    ? 'bg-red-500/20'
                    : 'bg-blue-500/20'
                }`}>
                  {activity.activityType === 'attack' ? (
                    <Sword className={`w-4 h-4 ${
                      activity.success ? 'text-red-400' : 'text-slate-500'
                    }`} />
                  ) : (
                    <Shield className={`w-4 h-4 ${
                      activity.success ? 'text-blue-400' : 'text-slate-500'
                    }`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold">
                      {activity.playerName}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      activity.activityType === 'attack'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {activity.activityType === 'attack' ? 'ATTAQUE' : 'DÉFENSE'}
                    </span>
                  </div>

                  {activity.activityType === 'attack' ? (
                    <>
                      <p className="text-sm text-slate-400 mb-1">
                        {activity.type.replace('-', ' ').toUpperCase()}
                      </p>
                      <p className="text-sm text-slate-300 line-clamp-2">
                        {activity.content}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-slate-300">
                      Méthode: {activity.method}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-2">
                    <span className={`text-xs font-semibold ${
                      activity.success
                        ? activity.activityType === 'attack'
                          ? 'text-red-400'
                          : 'text-blue-400'
                        : 'text-slate-500'
                    }`}>
                      {activity.success ? '✓ Réussi' : '✗ Échoué'}
                    </span>
                    <span className="text-xs text-yellow-400 font-semibold">
                      +{activity.points} pts
                    </span>
                    <span className="text-xs text-slate-500 ml-auto">
                      {new Date(activity.timestamp).toLocaleTimeString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
