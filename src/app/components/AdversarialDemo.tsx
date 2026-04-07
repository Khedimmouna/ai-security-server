import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Zap, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SAMPLE_IMAGES = [
  { id: 1, category: 'Chat', confidence: 98 },
  { id: 2, category: 'Chien', confidence: 95 },
  { id: 3, category: 'Voiture', confidence: 92 },
  { id: 4, category: 'Fleur', confidence: 97 }
];

export function AdversarialDemo() {
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0]);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [attacked, setAttacked] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);

  const applyAttack = () => {
    setIsAttacking(true);
    setTimeout(() => {
      setAttacked(true);
      setIsAttacking(false);
    }, 2000);
  };

  const resetAttack = () => {
    setNoiseLevel(0);
    setAttacked(false);
  };

  const getAdversarialPrediction = () => {
    if (!attacked) return null;
    
    const wrongCategories = ['Bruit', 'Inconnu', 'Avion', 'Pizza', 'Girafe'];
    const randomCategory = wrongCategories[Math.floor(Math.random() * wrongCategories.length)];
    const lowConfidence = Math.floor(Math.random() * 30) + 40; // 40-70%
    
    return { category: randomCategory, confidence: lowConfidence };
  };

  const adversarialResult = getAdversarialPrediction();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-slate-900/80 backdrop-blur-sm border-purple-500/30 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-8 h-8 text-purple-400" />
          <div>
            <h2 className="text-3xl font-bold text-white">Attaques Adverses</h2>
            <p className="text-slate-400">Manipulez les prédictions d'IA avec du bruit imperceptible</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Original Image Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-green-400" />
              Image Originale
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_IMAGES.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => {
                      setSelectedImage(img);
                      resetAttack();
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedImage.id === img.id
                        ? 'bg-purple-500/20 border-purple-500'
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-full h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mb-2 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-slate-500" />
                    </div>
                    <p className="text-white text-sm">{img.category}</p>
                  </button>
                ))}
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold mb-2">Prédiction du Modèle:</h4>
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg">{selectedImage.category}</span>
                  <span className="text-green-300 font-bold">{selectedImage.confidence}%</span>
                </div>
                <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${selectedImage.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Adversarial Image Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              Image Attaquée
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <label className="text-white text-sm mb-2 block">
                  Niveau de Bruit Adverse: {noiseLevel}%
                </label>
                <Slider
                  value={[noiseLevel]}
                  onValueChange={(value) => {
                    setNoiseLevel(value[0]);
                    if (attacked) setAttacked(false);
                  }}
                  max={100}
                  step={1}
                  className="mb-4"
                />
                <p className="text-xs text-slate-400">
                  Le bruit est imperceptible pour l'œil humain mais trompe l'IA
                </p>
              </div>

              <div className="relative">
                <div className={`w-full h-48 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center border-2 transition-all ${
                  noiseLevel > 0 ? 'border-orange-500/50' : 'border-slate-700'
                }`}>
                  <ImageIcon className="w-12 h-12 text-slate-500" />
                  {noiseLevel > 0 && (
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg"
                      style={{ opacity: noiseLevel / 100 }}
                    >
                      <div className="w-full h-full" style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.3\'/%3E%3C/svg%3E")',
                        backgroundSize: 'cover'
                      }} />
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={applyAttack}
                disabled={noiseLevel === 0 || isAttacking || attacked}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {isAttacking ? 'Attaque en cours...' : attacked ? 'Attaque appliquée' : 'Lancer l\'Attaque Adverse'}
              </Button>

              <AnimatePresence>
                {attacked && adversarialResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <h4 className="text-red-400 font-semibold">Prédiction Corrompue:</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-lg line-through opacity-50">{selectedImage.category}</span>
                      <span className="text-red-300 font-bold text-xl">{adversarialResult.category}</span>
                    </div>
                    <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full transition-all"
                        style={{ width: `${adversarialResult.confidence}%` }}
                      />
                    </div>
                    <p className="text-xs text-red-300 mt-2">
                      Confiance: {adversarialResult.confidence}% (réduite de {selectedImage.confidence - adversarialResult.confidence}%)
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {attacked && (
                <Button
                  onClick={resetAttack}
                  variant="outline"
                  className="w-full border-slate-700 hover:bg-slate-800"
                >
                  Réinitialiser
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <h3 className="text-white font-semibold mb-2">Comment ça fonctionne ?</h3>
            <p className="text-slate-300 text-sm mb-3">
              Les attaques adverses ajoutent un bruit subtil et calculé à une image. Ce bruit est imperceptible 
              pour l'œil humain mais suffit à tromper complètement un modèle d'IA, changeant sa prédiction.
            </p>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• <strong>FGSM:</strong> Fast Gradient Sign Method</li>
              <li>• <strong>PGD:</strong> Projected Gradient Descent</li>
              <li>• <strong>C&W:</strong> Carlini & Wagner Attack</li>
            </ul>
          </div>

          <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
            <h3 className="text-white font-semibold mb-2">Scénarios d'Attaque</h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-400">⚠️</span>
                <span><strong>Voitures autonomes:</strong> Panneaux de stop modifiés non détectés</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">⚠️</span>
                <span><strong>Sécurité:</strong> Reconnaissance faciale contournée</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">⚠️</span>
                <span><strong>Spam:</strong> Contenu malveillant non filtré</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
