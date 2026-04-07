# 📋 Guide Rapide Enseignant - AI Security Arena

## ⏱️ Setup Rapide (5 minutes)

### 1. Avant la Session
- [ ] Ouvrir l'application dans le navigateur
- [ ] Tester avec 2 comptes fictifs (1 rouge, 1 bleu)
- [ ] Projeter le `GUIDE_ETUDIANT.md` ou distribuer en PDF
- [ ] Former les équipes (4-6 étudiants par équipe idéal)

### 2. Introduction (5 min)
```
"Aujourd'hui, vous allez hacker et défendre des systèmes d'IA.
L'équipe rouge attaque, l'équipe bleue défend.
Chaque action rapporte des points. L'équipe avec le plus de points gagne!"
```

**Montrez :**
- ✅ Comment créer une attaque (équipe rouge)
- ✅ Comment défendre avec la matrice (équipe bleue)
- ✅ Le bouton d'aide (?) en bas à droite

### 3. Session de Jeu (20 min)
- Laissez les étudiants jouer librement
- Circulez et observez les stratégies
- Encouragez l'utilisation du chat d'équipe
- Notez les approches créatives

### 4. Débriefing (5 min)
Questions à poser :
- Quelles attaques ont le mieux fonctionné ?
- Quelle défense était la plus efficace ?
- Que vous a appris ce TP sur la sécurité IA ?

---

## 🎯 Règles Essentielles

### Système de Points

**Équipe Rouge:**
- ✅ Attaque réussie : **+100 pts**
- ❌ Attaque bloquée : **+20 pts**

**Équipe Bleue:**
- ✅ Défense réussie : **+80 pts**
- ❌ Défense échouée : **+30 pts**
- 🌟 Bonus justification (>50 chars) : **+40 pts**
- 🌟 Bonus efficacité (>90%) : **+30 pts**

### Matrice d'Efficacité Simplifié

| Attaque | Meilleure Défense | Efficacité |
|---------|-------------------|------------|
| **Injection de Prompt** | Isolation de Contexte | 90% |
| **Jailbreak** | Détection d'Anomalies | 95% |
| **Extraction de Données** | Sanitisation des Sorties | 95% |
| **Attaque Adverse** | Validation des Entrées | 90% |

💡 **Astuce Bleue:** Toujours choisir la défense avec 85%+ pour maximiser les points!

---

## 🎓 Objectifs d'Apprentissage

À la fin de cette session, les étudiants doivent pouvoir :

1. ✅ **Identifier** les 4 types d'attaques sur les LLMs
2. ✅ **Nommer** au moins 3 méthodes de défense
3. ✅ **Choisir** la défense appropriée selon le type d'attaque
4. ✅ **Expliquer** pourquoi une défense est efficace (justification)

---

## 🚨 Résolution de Problèmes

### "Personne ne rejoint"
- Vérifiez que tout le monde a le bon lien
- Les bots vont automatiquement rejoindre après quelques secondes
- Mode démo possible en solo

### "Les attaques ne passent pas"
- Normal ! C'est le défi
- Encouragez à lire les exemples
- Conseil : utiliser plusieurs mots-clés suspects

### "Les défenses échouent"
- Vérifier qu'ils consultent la matrice (bouton ?)
- Rappeler de choisir la défense "Optimal" (verte)
- Importance de la justification détaillée

---

## 📊 Évaluation Suggérée

### Grille Observation (pendant le jeu)

**Équipe Rouge (/10):**
- [ ] Variété des attaques (3 pts)
- [ ] Créativité des payloads (3 pts)
- [ ] Longueur et détails (2 pts)
- [ ] Utilisation des exemples (2 pts)

**Équipe Bleue (/10):**
- [ ] Consultation de la matrice (3 pts)
- [ ] Choix défenses appropriées (3 pts)
- [ ] Qualité justifications (3 pts)
- [ ] Compréhension technique (1 pt)

### Quiz Post-Session (optionnel)

1. Citez 2 types d'attaques sur les LLMs
2. Quelle défense contre le jailbreak ?
3. Pourquoi l'isolation de contexte est efficace ?
4. Donnez un exemple réel de prompt injection

---

## 💡 Astuces Pédagogiques

### Pour Rendre ça Plus Excitant
- 🏆 Annoncez le score toutes les 5 minutes
- 🎤 Commentez les actions importantes en direct
- 🏅 Prix symbolique pour l'équipe gagnante
- 📸 Screenshot du classement final

### Pour Approfondir
- Demandez aux étudiants de créer une nouvelle défense
- Recherche : trouver un cas réel d'attaque IA (actualité)
- Débat : éthique du Red Teaming
- Projet : concevoir un système de défense multicouche

### Variantes Possibles
- **Mode Tournament:** Plusieurs manches de 10 min
- **Handicap:** Équipe gagnante perd 50 pts au round suivant
- **Défis spéciaux:** "10 min que des jailbreaks"
- **Solo:** Chaque étudiant pour soi (FFA)

---

## 📚 Ressources à Partager

### Pendant le TP
- Bouton d'aide (?) → Matrice d'efficacité
- Chat d'équipe → Coordination
- Fil d'activité → Observer les autres

### Après le TP
- `GUIDE_ETUDIANT.md` → Révision complète
- `README.md` → Documentation technique
- OWASP Top 10 for LLMs → Approfondissement
- Cas réels d'attaques (actualité tech)

---

## ⏱️ Timeline Recommandée (35 min)

```
00:00 - 00:05 | Introduction et explication des règles
00:05 - 00:10 | Démonstration en live (1 attaque + 1 défense)
00:10 - 00:30 | Session de jeu libre
00:30 - 00:35 | Débriefing et questions
```

---

## 🎯 Points Clés à Retenir

1. 🔴 **Équipe Rouge = Créativité**  
   Plus c'est long et complexe, plus ça marche

2. 🔵 **Équipe Bleue = Analyse**  
   Matrice d'efficacité = clé du succès

3. 🎓 **But Pédagogique**  
   Comprendre vulnérabilités IA et défenses, pas juste gagner

4. ⚖️ **Rappel Éthique**  
   Ces techniques sont pour l'apprentissage, pas pour attaquer de vrais systèmes

---

## 📞 En Cas de Problème Technique

**L'application ne charge pas:**
- Vérifier JavaScript activé
- Essayer un autre navigateur (Chrome/Firefox recommandé)
- Rafraîchir la page (F5)

**Les bots ne rejoignent pas:**
- C'est normal, ils arrivent après 3-5 secondes
- Patience ! Jusqu'à 8 bots max

**Les actions ne s'enregistrent pas:**
- Vérifier que tous les champs sont remplis
- Pour l'équipe bleue : justification obligatoire

---

## ✅ Checklist Jour J

**Matériel:**
- [ ] Ordinateur/tablette pour chaque étudiant
- [ ] Projecteur pour la matrice d'efficacité
- [ ] Guide étudiant distribué ou projeté

**Logistique:**
- [ ] Connexion internet stable
- [ ] Application testée
- [ ] Timer visible (25-30 min)

**Pédagogique:**
- [ ] Équipes formées et équilibrées
- [ ] Objectifs d'apprentissage affichés
- [ ] Quiz/évaluation préparée (optionnel)

---

**Bon TP ! N'hésitez pas à adapter selon vos besoins 🚀**

*Pour toute question, consultez le README.md ou GUIDE_ETUDIANT.md*
