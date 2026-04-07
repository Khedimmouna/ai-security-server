# 📦 Installation et Déploiement - AI Security Arena

## 🖥️ Étape 1 : Télécharger sur Votre PC

### Option A : Depuis Figma Make
1. Cliquez sur le bouton **"Download"** ou **"Export"** en haut de l'interface Figma Make
2. Téléchargez le fichier ZIP du projet
3. Décompressez le fichier ZIP dans un dossier de votre choix

### Option B : Vérifier le Contenu
Après décompression, vous devriez avoir cette structure :
```
ai-security-arena/
├── src/
│   ├── app/
│   │   ├── components/
│   │   └── App.tsx
│   └── styles/
├── package.json
├── vite.config.ts
├── GUIDE_ETUDIANT.md
├── GUIDE_ENSEIGNANT.md
└── README.md
```

---

## 🚀 Étape 2 : Installer et Tester Localement

### Prérequis
- **Node.js** (version 18 ou supérieure) → [Télécharger ici](https://nodejs.org/)
- **pnpm** (gestionnaire de paquets) → S'installe automatiquement avec Node.js

### Installation

1. **Ouvrir un terminal** dans le dossier du projet :
   - Windows : Clic droit dans le dossier → "Ouvrir dans le terminal" ou "Git Bash here"
   - Mac/Linux : Ouvrir Terminal et naviguer vers le dossier

2. **Installer les dépendances** :
   ```bash
   npm install
   ```
   (Patientez 1-2 minutes, ça télécharge les librairies nécessaires)

3. **Lancer le site en local** :
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur** :
   - Le terminal affichera : `Local: http://localhost:5173`
   - Ouvrez cette adresse dans votre navigateur
   - ✅ Le site devrait maintenant fonctionner !

---

## 🌐 Étape 3 : Publier en Ligne Pour Vos Étudiants

Il existe plusieurs options GRATUITES pour publier le site. Voici les 3 meilleures :

---

### 🥇 Option 1 : Netlify (RECOMMANDÉ - Le Plus Simple)

**Avantages :** Gratuit, ultra-simple, URL personnalisable, HTTPS automatique

#### Méthode Drag & Drop (Sans Compte GitHub)

1. **Builder le projet** :
   ```bash
   npm run build
   ```
   Cela crée un dossier `dist/` avec le site prêt à déployer

2. **Aller sur Netlify** :
   - Allez sur [https://app.netlify.com/drop](https://app.netlify.com/drop)
   - Créez un compte gratuit (avec email ou GitHub)

3. **Déployer** :
   - Glissez-déposez le dossier `dist/` sur la page
   - Attendez 30 secondes
   - ✅ Votre site est en ligne !

4. **Obtenir l'URL** :
   - Netlify vous donne une URL type : `https://random-name-123.netlify.app`
   - Vous pouvez la personnaliser : `ai-security-arena-votrenom.netlify.app`

5. **Partager avec vos étudiants** :
   - Envoyez simplement l'URL
   - Ils peuvent y accéder depuis n'importe quel appareil !

---

### 🥈 Option 2 : Vercel (Aussi Simple que Netlify)

1. **Aller sur Vercel** :
   - [https://vercel.com](https://vercel.com)
   - Créez un compte gratuit

2. **Importer le projet** :
   - Cliquez "Add New Project"
   - Deux options :
     - **Sans GitHub** : Utilisez Vercel CLI (voir ci-dessous)
     - **Avec GitHub** : Connectez votre repo GitHub

3. **Méthode Sans GitHub (Vercel CLI)** :
   ```bash
   # Installer Vercel CLI
   npm install -g vercel
   
   # Déployer
   vercel
   ```
   - Suivez les instructions (appuyez sur Entrée pour les valeurs par défaut)
   - ✅ Votre site est en ligne !

4. **URL fournie** :
   - Type : `https://ai-security-arena.vercel.app`

---

### 🥉 Option 3 : GitHub Pages (Si Vous Utilisez GitHub)

1. **Créer un repo GitHub** :
   - Allez sur [github.com](https://github.com)
   - Créez un nouveau repository public

2. **Modifier le fichier `vite.config.ts`** :
   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     base: '/nom-de-votre-repo/', // ⚠️ Changez ici !
   });
   ```

3. **Installer gh-pages** :
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Ajouter dans `package.json`** :
   ```json
   {
     "scripts": {
       "build": "vite build",
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

5. **Déployer** :
   ```bash
   npm run deploy
   ```

6. **Activer GitHub Pages** :
   - Dans votre repo GitHub → Settings → Pages
   - Source : Sélectionnez "gh-pages" branch
   - ✅ URL : `https://votre-username.github.io/nom-repo/`

---

## 🎯 Comparaison Rapide

| Plateforme | Difficulté | Vitesse | URL Personnalisable | Gratuit |
|------------|------------|---------|---------------------|---------|
| **Netlify Drop** | ⭐ Facile | 30 sec | ✅ Oui | ✅ Oui |
| **Vercel** | ⭐⭐ Moyen | 2 min | ✅ Oui | ✅ Oui |
| **GitHub Pages** | ⭐⭐⭐ Avancé | 5 min | ⚠️ Limité | ✅ Oui |

**🏆 Recommandation : Utilisez Netlify Drop pour la simplicité !**

---

## 📱 Étape 4 : Partager avec Vos Étudiants

### 1. Créer un Document de Session

```markdown
# 🎮 TP Cybersécurité IA - Session du [DATE]

## 🔗 Lien d'Accès
👉 **https://votre-site.netlify.app**

## 📋 Instructions
1. Ouvrez le lien ci-dessus
2. Entrez votre prénom ou pseudo
3. Choisissez votre équipe (Rouge ou Bleue)
4. Commencez à jouer !

## 📚 Ressources
- [Guide Étudiant](lien-vers-guide.pdf)
- [Matrice d'Efficacité](voir bouton ? en bas à droite)

## ⏱️ Durée
Session de 30 minutes

Bon courage ! 🚀
```

### 2. Modes de Partage

**Option A : Email**
- Envoyez l'URL par email à vos étudiants
- Joignez le `GUIDE_ETUDIANT.md` en PDF

**Option B : QR Code**
- Générez un QR code de l'URL sur [qr-code-generator.com](https://www.qr-code-generator.com/)
- Projetez-le en classe

**Option C : Plateforme d'Apprentissage**
- Moodle, Google Classroom, Teams, etc.
- Créez une activité avec le lien

---

## 🔄 Mettre à Jour le Site

Si vous modifiez le code et voulez republier :

### Netlify
```bash
npm run build
# Puis glissez-déposez le nouveau dossier dist/ sur Netlify
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```bash
npm run deploy
```

---

## 🛠️ Dépannage

### ❌ "npm: command not found"
→ Installez Node.js : https://nodejs.org/

### ❌ Le site ne se lance pas localement
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules
npm install
npm run dev
```

### ❌ Erreur lors du build
```bash
# Vérifiez que toutes les dépendances sont installées
npm install
npm run build
```

### ❌ Les étudiants ne peuvent pas accéder au site
- Vérifiez que l'URL est correcte
- Vérifiez que le site est bien déployé (testez-le vous-même)
- Certains réseaux scolaires peuvent bloquer les sites externes (demandez à l'IT)

---

## 🔒 Important : Données et Vie Privée

⚠️ **Ce site fonctionne entièrement LOCALEMENT dans le navigateur**
- ✅ Aucune donnée n'est envoyée à un serveur
- ✅ Pas de base de données
- ✅ Pas de collecte d'informations personnelles
- ⚠️ Si un étudiant rafraîchit la page, il perd sa progression

**Pour une version avec persistance en temps réel entre étudiants**, il faudrait ajouter Supabase (base de données gratuite) - je peux vous aider si besoin !

---

## 📊 Statistiques de Session

Après votre TP, vous pouvez :
1. Demander aux étudiants de faire un screenshot du classement final
2. Discuter des stratégies utilisées
3. Analyser quelles défenses ont été les plus efficaces

---

## 💡 Astuces Pro

### Pour Tester Avant la Session
1. Ouvrez le site dans plusieurs onglets
2. Créez plusieurs comptes (Alice, Bob, etc.)
3. Testez les attaques et défenses
4. Vérifiez que tout fonctionne

### Pour la Session Réelle
1. Arrivez 10 minutes en avance
2. Testez le site sur le réseau de l'école
3. Ayez un plan B : site téléchargeable sur clé USB
4. Projetez la matrice d'efficacité pendant la session

### Sauvegarder le Dossier `dist/`
- Le dossier `dist/` contient le site compilé
- Vous pouvez le copier sur une clé USB comme backup
- Ouvrez `dist/index.html` directement dans un navigateur (fonctionne hors ligne !)

---

## 🎓 Ressources Supplémentaires

- [Documentation Vite](https://vitejs.dev/)
- [Documentation Netlify](https://docs.netlify.com/)
- [Documentation Vercel](https://vercel.com/docs)

---

**Besoin d'aide ? Consultez les guides ou testez d'abord en local ! 🚀**
