# 🚀 Démarrage Rapide - AI Security Arena

## ⏱️ En 3 Étapes (10 minutes)

### 📥 Étape 1 : Télécharger (2 min)
1. Depuis Figma Make : Bouton **"Download"** ou **"Export"**
2. Décompressez le fichier ZIP
3. ✅ Vous avez le dossier `ai-security-arena/`

### 🌐 Étape 2 : Publier en Ligne (5 min)

**Méthode Recommandée : Netlify Drop**

1. Dans le dossier du projet, ouvrir le terminal :
   ```bash
   npm install
   npm run build
   ```

2. Aller sur [https://app.netlify.com/drop](https://app.netlify.com/drop)

3. Créer un compte gratuit (avec email ou GitHub)

4. **Glisser-déposer** le dossier `dist/` sur la page

5. ✅ **Votre site est en ligne !**  
   URL type : `https://ai-security-arena-xyz.netlify.app`

### 📤 Étape 3 : Partager avec les Étudiants (3 min)

1. Envoyez l'URL par email/Teams/Moodle

2. Partagez le fichier `GUIDE_ETUDIANT.md` (en PDF ou lien)

3. ✅ **C'est prêt ! Les étudiants peuvent rejoindre.**

---

## 📋 Checklist Jour du TP

**30 minutes avant :**
- [ ] Testez l'URL (fonctionne bien ?)
- [ ] Projetez le `GUIDE_ETUDIANT.md` ou distribuez-le
- [ ] Affichez la matrice d'efficacité (page 15 du guide)

**Début du TP :**
- [ ] Expliquez les règles (5 min) - voir `GUIDE_ENSEIGNANT.md`
- [ ] Montrez une attaque et une défense en démo
- [ ] Donnez l'URL aux étudiants

**Pendant le TP :**
- [ ] Surveillez le classement en direct
- [ ] Encouragez l'utilisation du chat d'équipe
- [ ] Rappelez la matrice d'efficacité (bouton ? en bas à droite)

**Fin du TP :**
- [ ] Screenshot du classement final
- [ ] Débriefing (5 min) - voir `GUIDE_ENSEIGNANT.md`

---

## 📚 Les 4 Fichiers Importants

| Fichier | Pour Qui | Contenu |
|---------|----------|---------|
| **`GUIDE_ETUDIANT.md`** | 🎓 Étudiants | Règles, matrice d'efficacité, exemples, stratégies |
| **`GUIDE_ENSEIGNANT.md`** | 👨‍🏫 Enseignant | Déroulé de session, grille d'évaluation, conseils |
| **`INSTALLATION.md`** | 👨‍💻 Technique | Installation locale, déploiement détaillé |
| **`SUPABASE_SETUP.md`** | 🔄 Avancé | Mode temps réel (optionnel) |

---

## 🎯 Modes de Jeu

### Mode Local (Par Défaut)
- ✅ Fonctionne immédiatement
- ✅ Chaque étudiant joue dans son navigateur
- ✅ Bots simulent l'activité
- ⚠️ Pas de vraie interaction entre étudiants

**Idéal pour :**
- Première utilisation / découverte
- Petits groupes (< 10 étudiants)
- Sessions courtes (20-30 min)

### Mode Supabase (Optionnel)
- ✅ Vraie interaction en temps réel
- ✅ Chat d'équipe fonctionnel
- ✅ Classement synchronisé
- ⚠️ Setup de 15 minutes requis

**Idéal pour :**
- Grands groupes (> 10 étudiants)
- Étudiants à distance
- Sessions longues ou répétées

👉 **Voir `SUPABASE_SETUP.md` pour activer**

---

## 💡 Conseils Rapides

### Pour les Étudiants

**Équipe Rouge (Attaquants) :**
- ✨ Plus l'attaque est longue (>100 chars), plus elle réussit
- 🎯 Variez les types d'attaques
- 🔥 Utilisez plusieurs mots-clés suspects

**Équipe Bleue (Défenseurs) :**
- 📊 **Consultez la matrice !** (bouton ? en bas à droite)
- ✅ Choisissez toujours la défense "Optimal" (verte, 85%+)
- 📝 Justification détaillée = +40 points bonus

### Pour l'Enseignant

**Avant :**
- Testez le site vous-même
- Formez des équipes équilibrées (4-6 par équipe)
- Imprimez la matrice d'efficacité (page 15 du guide)

**Pendant :**
- Annoncez le score toutes les 5 min
- Encouragez la communication d'équipe
- Rappelez les bonus (justification, efficacité)

**Après :**
- Débriefing collectif (5 min)
- Quelles attaques ont fonctionné ?
- Quelles défenses étaient optimales ?

---

## 🎮 Système de Points

### Équipe Rouge
```
✅ Attaque réussie     : +100 pts
❌ Attaque bloquée     : +20 pts
🌟 Auto-bonus créativité (>100 chars)
```

### Équipe Bleue
```
✅ Défense réussie     : +80 pts
📝 + Justification     : +40 pts (>50 chars)
⭐ + Très efficace     : +30 pts (>90%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💎 Maximum possible    : 150 pts par défense !
```

---

## 📊 Matrice d'Efficacité (Mémo Rapide)

| Attaque | 🥇 Meilleure Défense | Efficacité |
|---------|----------------------|------------|
| 💉 Injection Prompt | Isolation de Contexte | 90% |
| 🔓 Jailbreak | Détection d'Anomalies | 95% |
| 📊 Extraction Données | Sanitisation Sorties | 95% |
| 🎭 Attaque Adverse | Validation Entrées | 90% |

👉 **Matrice complète dans le `GUIDE_ETUDIANT.md` page 15**

---

## 🛠️ Dépannage Rapide

### ❌ Le site ne charge pas
```bash
# Vérifier Node.js installé
node --version

# Réinstaller dépendances
npm install

# Rebuild
npm run build
```

### ❌ Erreur lors du déploiement Netlify
- Assurez-vous de glisser le dossier `dist/` (pas le dossier racine)
- Le dossier `dist/` doit contenir `index.html`

### ❌ Les étudiants ne peuvent pas accéder
- Testez l'URL vous-même dans un navigateur privé
- Vérifiez que le site n'est pas bloqué par le pare-feu de l'école
- Alternative : téléchargez le site sur clé USB (offline)

---

## 🎓 Objectifs d'Apprentissage

À la fin du TP, les étudiants doivent savoir :

1. ✅ **Identifier** les 4 types d'attaques sur les LLMs
2. ✅ **Choisir** la défense appropriée (matrice d'efficacité)
3. ✅ **Justifier** techniquement leur choix
4. ✅ **Comprendre** qu'aucune défense n'est parfaite à 100%

---

## 📞 Ressources

- **Questions pédagogiques** → `GUIDE_ENSEIGNANT.md`
- **Questions techniques** → `INSTALLATION.md`
- **Mode temps réel** → `SUPABASE_SETUP.md`
- **Règles complètes** → `GUIDE_ETUDIANT.md`
- **Documentation code** → `README.md`

---

## 🚀 Vous Êtes Prêt !

```
1. Téléchargez le projet ✅
2. Déployez sur Netlify (npm install → npm run build → glisser dist/) ✅
3. Partagez l'URL avec vos étudiants ✅
4. Lancez le TP ! 🎮
```

**Bon TP et que la meilleure équipe gagne ! 🏆**

---

## 🔗 Liens Utiles

- [Netlify Drop](https://app.netlify.com/drop) - Déploiement facile
- [Node.js](https://nodejs.org/) - Télécharger Node.js
- [Supabase](https://supabase.com) - Pour mode temps réel

---

**Temps total estimé : 10 minutes de setup → TP prêt ! ⚡**
