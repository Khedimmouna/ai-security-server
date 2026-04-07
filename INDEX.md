# 📑 INDEX - AI Security Arena

## 🎯 Par Rôle

### 👨‍🏫 Je suis Enseignant

**Découverte rapide :**
1. 📖 [`DEMARRAGE_RAPIDE.md`](/DEMARRAGE_RAPIDE.md) - 3 étapes pour lancer le TP (10 min)
2. 👨‍🏫 [`GUIDE_ENSEIGNANT.md`](/GUIDE_ENSEIGNANT.md) - Animation et évaluation
3. 🖨️ [`AFFICHE_CLASSE.md`](/AFFICHE_CLASSE.md) - À imprimer/projeter

**Setup technique :**
4. 💻 [`INSTALLATION.md`](/INSTALLATION.md) - Déploiement détaillé
5. 🔄 [`SUPABASE_SETUP.md`](/SUPABASE_SETUP.md) - Mode temps réel (optionnel)

**À distribuer aux étudiants :**
6. 🎓 [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) - Règles complètes

---

### 🎓 Je suis Étudiant

**Avant de jouer :**
1. 📖 [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) - LISEZ-MOI EN ENTIER !
   - Pages 1-5 : Règles et objectifs
   - Pages 6-12 : Les 4 attaques et 6 défenses
   - **Page 15 : MATRICE D'EFFICACITÉ** ⭐ (crucial !)
   - Pages 16-19 : Exemples concrets
   - Page 20+ : FAQ et stratégies

**Pendant le jeu :**
2. 🖨️ [`AFFICHE_CLASSE.md`](/AFFICHE_CLASSE.md) - Mémo rapide (projeté en classe)

---

### 💻 Je suis Développeur/IT

**Documentation technique :**
1. 📖 [`README.md`](/README.md) - Architecture et fonctionnalités
2. 💻 [`INSTALLATION.md`](/INSTALLATION.md) - Installation locale et build
3. 🔄 [`SUPABASE_SETUP.md`](/SUPABASE_SETUP.md) - Backend temps réel

**Code source :**
- `/src/app/App.tsx` - Composant principal
- `/src/app/utils/defenseSystem.ts` - Logique de scoring
- `/src/app/components/` - Tous les composants UI

---

## 📚 Par Type de Document

### 🚀 Guides de Démarrage
| Document | Description | Durée |
|----------|-------------|-------|
| [`DEMARRAGE_RAPIDE.md`](/DEMARRAGE_RAPIDE.md) | Les 3 étapes essentielles | 3 min |
| [`INSTALLATION.md`](/INSTALLATION.md) | Setup détaillé et déploiement | 15 min |

### 🎓 Guides Pédagogiques
| Document | Pour Qui | Description |
|----------|----------|-------------|
| [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) | Étudiants | Règles, matrice, exemples (400+ lignes) |
| [`GUIDE_ENSEIGNANT.md`](/GUIDE_ENSEIGNANT.md) | Enseignant | Animation, évaluation, conseils |
| [`AFFICHE_CLASSE.md`](/AFFICHE_CLASSE.md) | Tous | Mémo visuel à imprimer |

### 💻 Documentation Technique
| Document | Description |
|----------|-------------|
| [`README.md`](/README.md) | Vue d'ensemble du projet |
| [`SUPABASE_SETUP.md`](/SUPABASE_SETUP.md) | Activer le mode temps réel |
| `/src/app/utils/defenseSystem.ts` | Logique de scoring |

---

## 🎯 Par Cas d'Usage

### "Je veux lancer mon premier TP demain"
1. ✅ [`DEMARRAGE_RAPIDE.md`](/DEMARRAGE_RAPIDE.md) - Setup en 10 min
2. ✅ [`GUIDE_ENSEIGNANT.md`](/GUIDE_ENSEIGNANT.md) - Checklist jour J
3. ✅ Envoyez [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) aux étudiants ce soir
4. ✅ Imprimez [`AFFICHE_CLASSE.md`](/AFFICHE_CLASSE.md) en A3

---

### "Je veux comprendre le système de scoring"
1. ✅ [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) - Page 15 (Matrice d'efficacité)
2. ✅ [`README.md`](/README.md) - Section "Système de Scoring Dynamique"
3. ✅ `/src/app/utils/defenseSystem.ts` - Code source

---

### "Je veux personnaliser l'efficacité des défenses"
1. ✅ [`README.md`](/README.md) - Section "Personnalisation"
2. ✅ Modifiez `/src/app/utils/defenseSystem.ts`
3. ✅ Ligne 4 : `DEFENSE_EFFECTIVENESS` (matrice d'efficacité)
4. ✅ Mettez à jour [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) page 15

---

### "Je veux activer le mode multijoueur temps réel"
1. ✅ [`SUPABASE_SETUP.md`](/SUPABASE_SETUP.md) - Setup complet (15 min)
2. ✅ Créez un compte Supabase (gratuit)
3. ✅ Suivez les étapes 1-6

---

### "Je veux évaluer mes étudiants"
1. ✅ [`GUIDE_ENSEIGNANT.md`](/GUIDE_ENSEIGNANT.md) - Grille d'évaluation
2. ✅ [`README.md`](/README.md) - Points d'évaluation suggérés
3. ✅ [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) - Objectifs d'apprentissage

---

### "Un étudiant ne comprend pas les règles"
1. ✅ [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) - Tout est là !
2. ✅ [`AFFICHE_CLASSE.md`](/AFFICHE_CLASSE.md) - Résumé visuel
3. ✅ Dans le jeu : Bouton **?** en bas à droite (Matrice)

---

## 📊 Matrice de Décision : Quel Document Lire ?

```
Vous êtes... → Lisez d'abord...
├─ 👨‍🏫 Enseignant
│   ├─ Première fois → DEMARRAGE_RAPIDE.md
│   ├─ Préparation TP → GUIDE_ENSEIGNANT.md
│   └─ Évaluation → README.md (section Évaluation)
│
├─ 🎓 Étudiant
│   ├─ Avant le TP → GUIDE_ETUDIANT.md (TOUT !)
│   ├─ Pendant le TP → AFFICHE_CLASSE.md (mémo)
│   └─ Stratégie → GUIDE_ETUDIANT.md (pages 20+)
│
└─ 💻 Développeur
    ├─ Installation → INSTALLATION.md
    ├─ Architecture → README.md
    └─ Temps réel → SUPABASE_SETUP.md
```

---

## 🔍 Recherche Rapide

### "Comment..."

**...déployer le site ?**
→ [`INSTALLATION.md`](/INSTALLATION.md) - Étape 3

**...activer Supabase ?**
→ [`SUPABASE_SETUP.md`](/SUPABASE_SETUP.md)

**...choisir la bonne défense ?**
→ [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) - Page 15 (Matrice)

**...animer le TP ?**
→ [`GUIDE_ENSEIGNANT.md`](/GUIDE_ENSEIGNANT.md) - Section "Déroulé"

**...modifier les points ?**
→ `/src/app/utils/defenseSystem.ts` - Fonctions `calculateDefensePoints` et `calculateAttackPoints`

---

## 📖 Ordre de Lecture Recommandé

### Pour un Enseignant (Première Utilisation)

```
Jour J-7  → DEMARRAGE_RAPIDE.md (10 min)
          → INSTALLATION.md (15 min)
          → Testez le site localement

Jour J-3  → GUIDE_ENSEIGNANT.md (10 min)
          → Formez les équipes
          → Préparez les supports

Jour J-1  → Envoyez GUIDE_ETUDIANT.md aux étudiants
          → Imprimez AFFICHE_CLASSE.md
          → Testez l'URL en ligne

Jour J    → Projetez AFFICHE_CLASSE.md
          → Lancez le TP ! 🚀
```

---

## 🎯 Documents à Distribuer

### Avant le TP (1 jour avant)
- ✅ [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) (par email/Moodle/Teams)

### Pendant le TP (projeté)
- ✅ [`AFFICHE_CLASSE.md`](/AFFICHE_CLASSE.md)

### Après le TP (pour approfondissement)
- ✅ Lien vers ressources OWASP (dans README.md)
- ✅ Quiz/évaluation personnalisée

---

## 🔗 Liens Externes Utiles

### Déploiement
- [Netlify Drop](https://app.netlify.com/drop) - Déploiement facile
- [Vercel](https://vercel.com) - Alternative à Netlify
- [Node.js](https://nodejs.org/) - Télécharger Node.js

### Mode Temps Réel
- [Supabase](https://supabase.com) - Backend gratuit

### Ressources Pédagogiques
- [OWASP Top 10 for LLMs](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Anthropic AI Safety](https://www.anthropic.com/research)
- [OpenAI Red Teaming](https://openai.com/blog/red-teaming-network)

### Outils
- [QR Code Generator](https://www.qr-code-generator.com/) - Pour créer un QR code de votre URL

---

## 📞 Support

### Questions Fréquentes
→ [`GUIDE_ETUDIANT.md`](/GUIDE_ETUDIANT.md) - Section FAQ

### Problèmes Techniques
→ [`INSTALLATION.md`](/INSTALLATION.md) - Section Dépannage

### Questions Pédagogiques
→ [`GUIDE_ENSEIGNANT.md`](/GUIDE_ENSEIGNANT.md)

---

## 📊 Statistiques du Projet

**Documentation :**
- 7 fichiers de documentation
- ~3000 lignes de guides
- Disponible en Markdown (facile à convertir en PDF)

**Code :**
- React + TypeScript + Vite
- Tailwind CSS v4
- Motion (animations)
- 15+ composants

**Pédagogie :**
- 4 types d'attaques
- 6 méthodes de défense
- Matrice 4×6 d'efficacité
- Système de scoring dynamique

---

## ✅ Checklist Complète

**Setup Initial :**
- [ ] Télécharger le projet
- [ ] `npm install`
- [ ] `npm run build`
- [ ] Déployer sur Netlify
- [ ] Tester l'URL

**Préparation Pédagogique :**
- [ ] Lire GUIDE_ENSEIGNANT.md
- [ ] Former les équipes
- [ ] Envoyer GUIDE_ETUDIANT.md aux étudiants
- [ ] Imprimer AFFICHE_CLASSE.md

**Jour du TP :**
- [ ] Tester l'URL 30 min avant
- [ ] Projeter l'affiche de classe
- [ ] Avoir la matrice d'efficacité visible
- [ ] Timer 30 minutes visible

**Après le TP :**
- [ ] Screenshot du classement
- [ ] Débriefing (5 min)
- [ ] Quiz/évaluation (optionnel)
- [ ] Feedback des étudiants

---

**Naviguez facilement dans la documentation avec cet index ! 🚀**

*Dernière mise à jour : Février 2026*
