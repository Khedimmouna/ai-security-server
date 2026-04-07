import { Card } from './ui/card';
import { Shield, Eye, Lock, AlertTriangle, CheckCircle2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const PRINCIPLES = [
  {
    icon: Shield,
    title: "Défense en Profondeur",
    description: "Implémenter plusieurs couches de sécurité",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    practices: [
      "Validation des entrées utilisateur",
      "Filtrage multi-niveaux",
      "Monitoring en temps réel"
    ]
  },
  {
    icon: Eye,
    title: "Audit et Monitoring",
    description: "Surveiller et analyser le comportement du modèle",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    practices: [
      "Logging des requêtes",
      "Détection d'anomalies",
      "Tests de pénétration réguliers"
    ]
  },
  {
    icon: Lock,
    title: "Minimisation des Données",
    description: "Limiter l'accès aux données sensibles",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    practices: [
      "Anonymisation des données",
      "Chiffrement end-to-end",
      "Contrôle d'accès strict"
    ]
  },
  {
    icon: AlertTriangle,
    title: "Formation Adversariale",
    description: "Entraîner les modèles contre les attaques",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    practices: [
      "Augmentation de données adverses",
      "Entraînement robuste",
      "Tests red team"
    ]
  },
  {
    icon: CheckCircle2,
    title: "Validation et Testing",
    description: "Tester rigoureusement avant déploiement",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    practices: [
      "Tests de sécurité automatisés",
      "Validation par des experts",
      "Benchmarks de sécurité"
    ]
  },
  {
    icon: Users,
    title: "Gouvernance et Éthique",
    description: "Établir des politiques claires",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    practices: [
      "Comité d'éthique IA",
      "Documentation complète",
      "Transparence et responsabilité"
    ]
  }
];

export function SecurityPrinciples() {
  return (
    <div className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Principes de Sécurité pour l'IA
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Un framework complet pour sécuriser vos systèmes d'IA générative
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRINCIPLES.map((principle, idx) => {
          const Icon = principle.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card className={`${principle.bgColor} border ${principle.borderColor} p-6 h-full hover:scale-105 transition-transform`}>
                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${principle.bgColor} border ${principle.borderColor}`}>
                    <Icon className={`w-6 h-6 ${principle.color}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{principle.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{principle.description}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {principle.practices.map((practice, practiceIdx) => (
                    <li key={practiceIdx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className={`${principle.color} mt-0.5`}>•</span>
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4 text-center">
          Checklist de Sécurité pour l'IA Générative
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Avant le Déploiement
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span>Audit complet des données d'entraînement</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span>Tests de sécurité et de robustesse</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span>Mise en place de filtres et validations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span>Documentation des risques identifiés</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span>Plan de réponse aux incidents</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              En Production
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Monitoring continu des requêtes</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Alertes automatiques sur anomalies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Mises à jour régulières du modèle</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Audit périodique des outputs</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">✓</span>
                <span>Feedback utilisateur et amélioration</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm text-center">
            <strong>Important:</strong> La sécurité de l'IA est un processus continu, pas une destination. 
            Restez informé des nouvelles vulnérabilités et adaptez vos défenses en conséquence.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 text-center text-slate-400"
      >
        <p className="text-sm">
          Démonstration créée à des fins éducatives • Les exemples sont simulés • 
          <strong className="text-purple-400"> Ne pas utiliser pour des attaques réelles</strong>
        </p>
      </motion.div>
    </div>
  );
}
