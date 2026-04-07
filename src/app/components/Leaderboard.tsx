import { motion } from 'framer-motion';
import { Trophy, Medal, Crown } from 'lucide-react';
import { Card } from './ui/card';
import type { Player } from '../App';

interface LeaderboardProps {
  players: Player[];
  currentPlayerId: string;
}

export function Leaderboard({ players, currentPlayerId }: LeaderboardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (index === 1) return <Medal className="w-5 h-5 text-slate-400" />;
    if (index === 2) return <Medal className="w-5 h-5 text-orange-400" />;
    return null;
  };

  return (
    <Card className="bg-slate-900/90 backdrop-blur-sm border-purple-500/30 p-4">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-400" />
        Classement
      </h3>

      <div className="space-y-2">
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 rounded-lg border transition-all ${
              player.id === currentPlayerId
                ? 'bg-purple-500/20 border-purple-500/50'
                : 'bg-slate-800/50 border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 text-center">
                {getRankIcon(index) || (
                  <span className="text-slate-400 font-bold">#{index + 1}</span>
                )}
              </div>

              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-700">
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold truncate ${
                    player.id === currentPlayerId ? 'text-purple-300' : 'text-white'
                  }`}>
                    {player.name}
                  </span>
                  {player.id === currentPlayerId && (
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                      Vous
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${
                    player.team === 'red' ? 'bg-red-400' : 'bg-blue-400'
                  }`} />
                  <span className="text-xs text-slate-400">
                    {player.team === 'red' ? 'Rouge' : 'Bleue'}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-yellow-400 font-bold">{player.score}</div>
                <div className="text-xs text-slate-400">pts</div>
              </div>
            </div>
          </motion.div>
        ))}

        {sortedPlayers.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            Aucun joueur pour le moment
          </div>
        )}
      </div>
    </Card>
  );
}
