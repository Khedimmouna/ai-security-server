import { Card } from './ui/card';
import { Shield, Sword, TrendingUp, Award } from 'lucide-react';

export function ScoringGuide() {
  return (
    <div className="space-y-4 text-sm">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Red Team Scoring */}
        <Card className="bg-red-500/10 border border-red-500/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sword className="w-5 h-5 text-red-400" />
            <h3 className="text-red-400 font-semibold">Points Équipe Rouge</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-red-500/10 rounded">
              <span className="text-slate-300">Attaque réussie</span>
              <span className="text-red-300 font-bold">+100 pts</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-red-500/5 rounded">
              <span className="text-slate-300">Attaque bloquée</span>
              <span className="text-slate-400 font-bold">+20 pts</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
              <span className="text-slate-300 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Bonus créativité ({">"} 100 chars)
              </span>
              <span className="text-yellow-400 font-bold">Auto</span>
            </div>
          </div>

          <div className="mt-3 p-2 bg-slate-800/50 rounded text-xs text-slate-400">
            💡 Conseil: Plus votre attaque est détaillée et utilise plusieurs techniques, plus elle a de chances de réussir!
          </div>
        </Card>

        {/* Blue Team Scoring */}
        <Card className="bg-blue-500/10 border border-blue-500/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <h3 className="text-blue-400 font-semibold">Points Équipe Bleue</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-blue-500/10 rounded">
              <span className="text-slate-300">Défense réussie</span>
              <span className="text-blue-300 font-bold">+80 pts</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-500/5 rounded">
              <span className="text-slate-300">Défense échouée</span>
              <span className="text-slate-400 font-bold">+30 pts</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
              <span className="text-slate-300 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Justification détaillée ({">"} 50 chars)
              </span>
              <span className="text-yellow-400 font-bold">+40 pts</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-green-500/10 rounded border border-green-500/20">
              <span className="text-slate-300 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Très haute efficacité ({">"} 90%)
              </span>
              <span className="text-green-400 font-bold">+30 pts</span>
            </div>
          </div>

          <div className="mt-3 p-2 bg-slate-800/50 rounded text-xs text-slate-400">
            💡 Conseil: Consultez la matrice d'efficacité (bouton ? en bas à droite) pour choisir la meilleure défense!
          </div>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="bg-purple-500/10 border border-purple-500/30 p-4">
        <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Stratégies pour Maximiser vos Points
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-red-400 font-semibold mb-2 text-xs">Équipe Rouge:</h5>
            <ul className="space-y-1 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Variez vos types d'attaques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Utilisez plusieurs mots-clés suspects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Écrivez au moins 100 caractères</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Combinez plusieurs techniques</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-blue-400 font-semibold mb-2 text-xs">Équipe Bleue:</h5>
            <ul className="space-y-1 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Choisissez la défense avec 85%+ d'efficacité</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Rédigez une justification de 50+ caractères</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Expliquez POURQUOI cette défense fonctionne</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span>Mentionnez le mécanisme technique</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
