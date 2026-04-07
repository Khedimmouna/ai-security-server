# 🎮 AI SECURITY ARENA

Une plateforme interactive de cybersécurité IA pour l'enseignement, où les étudiants s'affrontent en équipes (Rouge vs Bleue) dans un environnement gamifié en temps réel.

---

## 📑 NAVIGATION RAPIDE

**🗂️ Tous les documents sont indexés ici :** 👉 **[`INDEX.md`](/INDEX.md)**

---

## 🚀 DÉMARRAGE RAPIDE (10 minutes)

**Nouveau ? Commencez ici :** 👉 **[`DEMARRAGE_RAPIDE.md`](/DEMARRAGE_RAPIDE.md)**

### Les 3 Étapes

1. **📥 Télécharger** : Bouton "Download" dans Figma Make
2. **🌐 Publier** : `npm install` → `npm run build` → Glisser `dist/` sur [Netlify](https://app.netlify.com/drop)
3. **📤 Partager** : Envoyez l'URL aux étudiants

✅ **Votre TP est prêt !**

---

## 📚 Documentation Complète

| Document | Pour Qui | Description | Temps de Lecture |
|----------|----------|-------------|------------------|
| **[🚀 DEMARRAGE_RAPIDE.md](/DEMARRAGE_RAPIDE.md)** | Tous | Guide ultra-rapide (3 étapes) | 3 min |
| **[🎓 GUIDE_ETUDIANT.md](/GUIDE_ETUDIANT.md)** | Étudiants | Règles, matrice, stratégies | 15 min |
| **[👨‍🏫 GUIDE_ENSEIGNANT.md](/GUIDE_ENSEIGNANT.md)** | Enseignant | Animation, évaluation, conseils | 10 min |
| **[💻 INSTALLATION.md](/INSTALLATION.md)** | Technique | Installation et déploiement détaillé | 15 min |
| **[🔄 SUPABASE_SETUP.md](/SUPABASE_SETUP.md)** | Avancé | Mode temps réel (optionnel) | 20 min |
| **[📖 README.md](/README.md)** | Tous | Ce fichier - Vue d'ensemble | 5 min |

---

## 🎯 Concept Clé

### Équipe Rouge (Attaquants)
- **Mission** : Exploiter les vulnérabilités de l'IA
- **Types d'attaques** : Injection de prompt, Jailbreak, Extraction de données, Attaques adverses
- **Points** : +100 pts par attaque réussie

### Équipe Bleue (Défenseurs)  
- **Mission** : Protéger l'IA avec les bonnes défenses
- **Méthodes** : 6 techniques de défense avec efficacité variable selon l'attaque
- **Points** : +80 pts par défense réussie, +40 pts bonus pour justification détaillée

### Système de Scoring Dynamique

Chaque méthode de défense a une **efficacité différente** selon le type d'attaque :

```
Exemple : Contre une Injection de Prompt
- Isolation de Contexte : 90% ✅ (Optimal)
- Validation des Entrées : 80% ✅ (Bon)
- Filtrage de Contenu : 60% ⚠️ (Moyen)
- Limitation de Requêtes : 40% ❌ (Faible)
```

**L'équipe bleue doit choisir la bonne défense contre chaque attaque !**

## 🎓 Valeur Pédagogique

### Concepts Enseignés
1. **Vulnérabilités des LLMs** : Injection, Jailbreak, Leakage, Adversarial
2. **Défense en profondeur** : Multiples couches de sécurité
3. **Trade-offs sécurité/usabilité** : Aucune défense n'est parfaite
4. **Pensée Red Team/Blue Team** : Approches offensive et défensive
5. **Analyse de risques** : Évaluation de l'efficacité des mesures

### Compétences Développées
- 🧠 Pensée critique et analyse
- 🎨 Créativité dans l'attaque/défense
- 👥 Travail d'équipe et coordination
- 📊 Prise de décision basée sur des données
- 💬 Communication technique

## 🛠️ Fonctionnalités Principales

### Interface Interactive
- ⚔️ **Panneau d'attaque** pour l'équipe rouge avec exemples
- 🛡️ **Panneau de défense** pour l'équipe bleue avec scoring en temps réel
- 📊 **Matrice d'efficacité** accessible via bouton d'aide (coin inférieur droit)
- 🏆 **Classement en direct** avec avatars uniques
- 💬 **Chat d'équipe** pour coordination
- 📈 **Fil d'activité** montrant toutes les actions

### Système de Points Avancé
```javascript
Équipe Rouge :
- Attaque réussie : +100 pts
- Attaque bloquée : +20 pts  
- Bonus créativité (>100 chars) : automatique

Équipe Bleue :
- Défense optimale réussie : +80 pts
- Défense avec bonus justification : +120 pts (80+40)
- Très haute efficacité (>90%) : +110 pts (80+30)
- Défense échouée : +30 pts (pour l'effort)
```

### Aide Contextuelle
- 💡 **Conseils tactiques** selon le type d'attaque
- ✨ **Indicateurs "Optimal"** sur les meilleures défenses
- 📊 **Barres d'efficacité** colorées (vert/bleu/jaune/rouge)
- 🎯 **Suggestion de meilleure défense** pour chaque attaque

## 📊 Matrice d'Efficacité Complète

| Attaque ↓ / Défense → | Validation | Filtrage | Rate Limit | Anomalies | Sanitisation | Isolation |
|------------------------|------------|----------|------------|-----------|--------------|-----------|
| **Injection Prompt**   | 80% ✅     | 60%      | 40%        | 70%       | 50%          | 90% ✅    |
| **Jailbreak**          | 60%        | 70%      | 45%        | 95% ✅    | 75%          | 85% ✅    |
| **Extraction Données** | 65%        | 85% ✅   | 50%        | 70%       | 95% ✅       | 60%       |
| **Attaque Adverse**    | 90% ✅     | 60%      | 70%        | 85% ✅    | 55%          | 65%       |

✅ = Efficacité ≥ 70% (recommandé)

## 🎮 Déroulement d'une Session Typique

### Temps : 30 minutes

**0-2 min** : Inscription et choix d'équipe
- Étudiants entrent leur pseudo
- Choix entre Équipe Rouge ou Bleue
- Auto-équilibrage recommandé

**2-25 min** : Phase de bataille active
- Équipe Rouge lance des attaques variées
- Équipe Bleue analyse et défend avec justifications
- Les bots simulent l'activité pour maintenir le rythme
- Coordination via chat d'équipe

**25-30 min** : Décompte et débriefing
- Annonce de l'équipe gagnante
- Discussion des meilleures attaques
- Analyse des défenses optimales
- Lien avec cas réels (ChatGPT, Claude, etc.)

## 💡 Conseils pour l'Animation

### Avant la Session
1. Testez l'application vous-même
2. Imprimez la matrice d'efficacité (ou projetez-la)
3. Préparez des exemples d'attaques réelles (actualité)
4. Formez des équipes équilibrées (4-6 par équipe idéal)

### Pendant la Session
1. **Introduction (5 min)** : Contexte de sécurité IA actuelle
2. **Démonstration (3 min)** : Montrez une attaque et défense exemple
3. **Jeu libre (20 min)** : Laissez les étudiants expérimenter
4. **Debriefing (5 min)** : Discussion collective

### Après la Session
1. **Quiz ou évaluation** : Testez la compréhension
2. **Projet** : Concevoir une nouvelle défense
3. **Recherche** : Analyser des cas réels documentés
4. **Discussion éthique** : Responsabilité des chercheurs en sécurité

## 🔍 Points d'Évaluation Suggérés

### Équipe Rouge (Créativité d'Attaque)
- [ ] Variété des techniques utilisées
- [ ] Originalité des approches
- [ ] Complexité des payloads
- [ ] Compréhension des vulnérabilités

### Équipe Bleue (Analyse Défensive)
- [ ] Choix de défenses appropriées
- [ ] Qualité des justifications techniques
- [ ] Utilisation de la matrice d'efficacité
- [ ] Apprentissage et adaptation

### Compétences Transversales
- [ ] Collaboration d'équipe
- [ ] Communication claire
- [ ] Pensée stratégique
- [ ] Éthique et responsabilité

## 🌐 Applications Réelles

Cette simulation reflète des enjeux réels :

1. **Injections de prompts** : Manipulations de ChatGPT, Claude, Bard
2. **Jailbreaks** : Contournements documentés (DAN, etc.)
3. **Data leakage** : Mémorisation d'informations sensibles
4. **Attaques adverses** : Manipulation d'IA de modération de contenu

### Ressources Externes
- [OWASP Top 10 for LLMs](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Anthropic AI Safety Research](https://www.anthropic.com/research)
- [OpenAI Red Teaming Network](https://openai.com/blog/red-teaming-network)

## 📝 Notes Techniques

### Architecture
- **Frontend uniquement** : Pas de serveur nécessaire
- **État local** : Simulation temps-réel avec bots
- **Responsive** : Fonctionne desktop et mobile
- **Animations** : Motion (anciennement Framer Motion)

### Personnalisation
- Modifiez `/src/app/utils/defenseSystem.ts` pour ajuster l'efficacité
- Changez les exemples dans `/src/app/components/RedTeamPanel.tsx`
- Ajustez les points dans `defenseSystem.ts`

## 🎯 Objectifs d'Apprentissage (Bloom)

### Niveau 1-2 : Comprendre et Se Souvenir
- ✅ Identifier les 4 types d'attaques
- ✅ Nommer les 6 méthodes de défense

### Niveau 3-4 : Appliquer et Analyser  
- ✅ Choisir la défense appropriée selon l'attaque
- ✅ Justifier techniquement les choix de défense

### Niveau 5-6 : Évaluer et Créer
- ✅ Concevoir de nouvelles techniques d'attaque
- ✅ Proposer des améliorations de défense

## 📄 Licence et Usage

Libre d'utilisation pour l'enseignement. 

**Important** : Cet outil est à but **pédagogique uniquement**. Rappelez aux étudiants :
- ⚖️ La légalité : Ne jamais attaquer des systèmes sans autorisation
- 🤝 L'éthique : Divulgation responsable des vulnérabilités
- 🎓 L'apprentissage : Utiliser ces compétences pour améliorer la sécurité

---

## 🆘 Support

**Questions fréquentes ?** → Consultez le `GUIDE_ETUDIANT.md`  
**Problème technique ?** → Vérifiez que JavaScript est activé dans le navigateur  
**Suggestions d'amélioration ?** → N'hésitez pas à contribuer !

---

**Bon TP et que la meilleure équipe gagne ! 🏆⚔️🛡️**