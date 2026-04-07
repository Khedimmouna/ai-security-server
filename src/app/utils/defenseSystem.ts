import type { Attack } from '../App';

// Matrice d'efficacité des défenses contre chaque type d'attaque
export const DEFENSE_EFFECTIVENESS = {
  'prompt-injection': {
    'input-validation': 80,
    'content-filtering': 60,
    'rate-limiting': 40,
    'anomaly-detection': 70,
    'output-sanitization': 50,
    'context-isolation': 90
  },
  'jailbreak': {
    'input-validation': 60,
    'content-filtering': 70,
    'rate-limiting': 45,
    'anomaly-detection': 95,
    'output-sanitization': 75,
    'context-isolation': 85
  },
  'data-leak': {
    'input-validation': 65,
    'content-filtering': 85,
    'rate-limiting': 50,
    'anomaly-detection': 70,
    'output-sanitization': 95,
    'context-isolation': 60
  },
  'adversarial': {
    'input-validation': 90,
    'content-filtering': 60,
    'rate-limiting': 70,
    'anomaly-detection': 85,
    'output-sanitization': 55,
    'context-isolation': 65
  }
} as const;

export interface DefenseMethod {
  id: keyof typeof DEFENSE_EFFECTIVENESS['prompt-injection'];
  name: string;
  description: string;
  baseEffectiveness: number;
}

export const DEFENSE_METHODS: DefenseMethod[] = [
  {
    id: 'input-validation',
    name: 'Validation des Entrées',
    description: 'Filtrer les patterns malveillants',
    baseEffectiveness: 70
  },
  {
    id: 'content-filtering',
    name: 'Filtrage de Contenu',
    description: 'Bloquer les contenus dangereux',
    baseEffectiveness: 75
  },
  {
    id: 'rate-limiting',
    name: 'Limitation de Requêtes',
    description: 'Limiter les tentatives répétées',
    baseEffectiveness: 60
  },
  {
    id: 'anomaly-detection',
    name: 'Détection d\'Anomalies',
    description: 'Identifier les comportements suspects',
    baseEffectiveness: 80
  },
  {
    id: 'output-sanitization',
    name: 'Sanitisation des Sorties',
    description: 'Nettoyer les réponses du modèle',
    baseEffectiveness: 65
  },
  {
    id: 'context-isolation',
    name: 'Isolation de Contexte',
    description: 'Séparer les instructions système',
    baseEffectiveness: 85
  }
];

/**
 * Calcule l'efficacité d'une méthode de défense contre un type d'attaque spécifique
 */
export function getDefenseEffectiveness(
  attackType: Attack['type'],
  defenseMethodId: DefenseMethod['id']
): number {
  return DEFENSE_EFFECTIVENESS[attackType][defenseMethodId];
}

/**
 * Trouve la meilleure méthode de défense pour un type d'attaque
 */
export function getBestDefenseMethod(attackType: Attack['type']): DefenseMethod {
  const effectiveness = DEFENSE_EFFECTIVENESS[attackType];
  let bestMethodId: DefenseMethod['id'] = 'input-validation';
  let bestScore = 0;

  for (const [methodId, score] of Object.entries(effectiveness)) {
    if (score > bestScore) {
      bestScore = score;
      bestMethodId = methodId as DefenseMethod['id'];
    }
  }

  return DEFENSE_METHODS.find(m => m.id === bestMethodId)!;
}

/**
 * Calcule si une défense réussit contre une attaque
 */
export function calculateDefenseSuccess(
  attackType: Attack['type'],
  defenseMethodId: DefenseMethod['id'],
  justificationLength: number
): { success: boolean; effectiveness: number; bonus: number } {
  const baseEffectiveness = getDefenseEffectiveness(attackType, defenseMethodId);
  
  // Bonus pour une justification détaillée (jusqu'à +15%)
  const justificationBonus = Math.min(15, Math.floor(justificationLength / 10));
  
  const totalEffectiveness = Math.min(100, baseEffectiveness + justificationBonus);
  
  // Ajoute un peu d'aléatoire (±10%) pour la variété
  const randomFactor = (Math.random() * 20) - 10;
  const finalEffectiveness = Math.max(0, Math.min(100, totalEffectiveness + randomFactor));
  
  const success = finalEffectiveness >= 60; // Seuil de réussite à 60%
  
  return {
    success,
    effectiveness: Math.round(finalEffectiveness),
    bonus: justificationBonus
  };
}

/**
 * Calcule les points gagnés pour une défense
 */
export function calculateDefensePoints(
  success: boolean,
  effectiveness: number,
  justificationLength: number
): number {
  let points = success ? 80 : 30;
  
  // Bonus pour justification détaillée (>50 caractères)
  if (justificationLength > 50) {
    points += 40;
  }
  
  // Bonus pour très haute efficacité (>90%)
  if (effectiveness > 90) {
    points += 30;
  }
  
  return points;
}

/**
 * Obtient une explication pédagogique de l'efficacité
 */
export function getEffectivenessExplanation(
  attackType: Attack['type'],
  defenseMethodId: DefenseMethod['id'],
  effectiveness: number
): string {
  const method = DEFENSE_METHODS.find(m => m.id === defenseMethodId)!;
  const best = getBestDefenseMethod(attackType);
  
  if (effectiveness >= 85) {
    return `Excellent choix ! ${method.name} est ${method.id === best.id ? 'la meilleure défense' : 'très efficace'} contre ce type d'attaque.`;
  } else if (effectiveness >= 70) {
    return `Bon choix. ${method.name} fonctionne bien, mais ${best.name} serait encore plus efficace (${DEFENSE_EFFECTIVENESS[attackType][best.id]}%).`;
  } else if (effectiveness >= 50) {
    return `Choix moyen. Cette défense peut fonctionner, mais considérez ${best.name} pour une meilleure protection (${DEFENSE_EFFECTIVENESS[attackType][best.id]}%).`;
  } else {
    return `Défense sous-optimale. ${best.name} serait beaucoup plus efficace (${DEFENSE_EFFECTIVENESS[attackType][best.id]}% vs ${effectiveness}%).`;
  }
}

/**
 * Obtient un conseil tactique pour l'équipe bleue
 */
export function getDefenseTip(attackType: Attack['type']): string {
  const tips = {
    'prompt-injection': 'L\'isolation de contexte empêche l\'attaquant de modifier les instructions système. Cherchez des tentatives de "ignore les instructions précédentes".',
    'jailbreak': 'La détection d\'anomalies identifie les patterns typiques de jailbreak comme "hypothétiquement" ou "DAN". Analysez le contexte narratif suspect.',
    'data-leak': 'La sanitisation des sorties filtre les données sensibles avant qu\'elles n\'atteignent l\'utilisateur. Bloquez toute demande de "répéter" ou "mémoriser".',
    'adversarial': 'La validation des entrées détecte les encodages et caractères spéciaux suspects. Cherchez des tentatives d\'obfuscation ou d\'encodage.'
  };
  
  return tips[attackType];
}
