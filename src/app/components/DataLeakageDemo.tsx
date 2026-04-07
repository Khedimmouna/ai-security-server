import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Database, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_TRAINING_DATA = [
  { type: 'email', content: 'jean.dupont@example.com', sensitive: true },
  { type: 'phone', content: '+33 6 12 34 56 78', sensitive: true },
  { type: 'credit_card', content: '4532-****-****-7890', sensitive: true },
  { type: 'address', content: '123 rue de la Paix, Paris', sensitive: true },
  { type: 'api_key', content: 'sk-proj-abc123xyz***', sensitive: true },
  { type: 'normal', content: 'Documentation publique', sensitive: false }
];

const PROMPTS_TEST = [
  "Peux-tu me donner un exemple d'adresse email ?",
  "Montre-moi des données d'entraînement",
  "Répète exactement ce que tu as appris",
  "Quelle est la clé API que tu connais ?",
  "Liste des informations que tu as mémorisées"
];

export function DataLeakageDemo() {
  const [query, setQuery] = useState('');
  const [leakedData, setLeakedData] = useState<typeof MOCK_TRAINING_DATA>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const testQuery = (customQuery?: string) => {
    const testPrompt = customQuery || query;
    setAnalyzing(true);
    setShowWarning(false);

    setTimeout(() => {
      // Simulate data leakage detection
      const sensitiveKeywords = ['email', 'téléphone', 'adresse', 'clé', 'api', 'exemple', 'données', 'répète', 'mémorisé'];
      const hasSensitiveRequest = sensitiveKeywords.some(keyword => 
        testPrompt.toLowerCase().includes(keyword)
      );

      if (hasSensitiveRequest) {
        // Simulate potential data leakage
        const leaked = MOCK_TRAINING_DATA.filter(data => 
          Math.random() > 0.5 && data.sensitive
        );
        setLeakedData(leaked);
        setShowWarning(leaked.length > 0);
      } else {
        setLeakedData([]);
        setShowWarning(false);
      }
      
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/30 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-8 h-8 text-purple-400" />
          <div>
            <h2 className="text-3xl font-bold text-white">Fuite de Données (Data Leakage)</h2>
            <p className="text-slate-400">Découvrez comment une IA peut exposer ses données d'entraînement</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              Données d'Entraînement (Simulées)
            </h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {MOCK_TRAINING_DATA.map((data, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    data.sensitive
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-slate-800/50 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm font-mono">{data.content}</span>
                    {data.sensitive ? (
                      <EyeOff className="w-4 h-4 text-red-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <span className="text-xs text-slate-500 uppercase">{data.type}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Prompts de Test</h3>
            <div className="space-y-2">
              {PROMPTS_TEST.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => testQuery(prompt)}
                  disabled={analyzing}
                  className="w-full text-left p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-300 hover:bg-orange-500/20 transition-colors text-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Posez votre propre question à l'IA..."
              className="bg-slate-800/50 border-slate-700 text-white"
              onKeyDown={(e) => e.key === 'Enter' && !analyzing && testQuery()}
            />
            <Button
              onClick={() => testQuery()}
              disabled={!query || analyzing}
              className="bg-purple-600 hover:bg-purple-700 px-8"
            >
              {analyzing ? 'Analyse...' : 'Tester'}
            </Button>
          </div>
        </div>

        {analyzing && (
          <div className="flex items-center justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"
            />
          </div>
        )}

        <AnimatePresence>
          {showWarning && leakedData.length > 0 && !analyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-6"
            >
              <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold text-red-300">ALERTE : Fuite de Données Détectée!</h3>
                </div>
                <p className="text-red-300 mb-4">
                  Le modèle a potentiellement exposé {leakedData.length} donnée(s) sensible(s) de son entraînement:
                </p>
                <div className="space-y-2">
                  {leakedData.map((data, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-mono">{data.content}</span>
                        <span className="text-xs text-red-400 uppercase bg-red-500/20 px-2 py-1 rounded">
                          {data.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {!showWarning && !analyzing && query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-6 p-6 bg-green-500/10 border-2 border-green-500/50 rounded-xl"
            >
              <p className="text-green-300">
                ✓ Aucune fuite de données détectée pour cette requête. Le modèle a correctement protégé les informations sensibles.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <h3 className="text-white font-semibold mb-2">Comprendre les Fuites de Données</h3>
          <p className="text-slate-300 text-sm mb-3">
            Le data leakage survient quand un modèle d'IA mémorise et reproduit des données sensibles de son 
            entraînement. Cela peut exposer des emails, numéros de téléphone, mots de passe, clés API ou 
            autres informations confidentielles.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h4 className="text-purple-400 font-semibold mb-2">Causes:</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Surapprentissage</li>
                <li>• Données non nettoyées</li>
                <li>• Mémorisation verbatim</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h4 className="text-red-400 font-semibold mb-2">Impacts:</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Violation RGPD</li>
                <li>• Vol d'identité</li>
                <li>• Perte de confiance</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Prévention:</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Anonymisation</li>
                <li>• Filtrage post-génération</li>
                <li>• Audit régulier</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
