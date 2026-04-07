# 🔄 Mode Temps Réel avec Supabase (Optionnel)

## 📋 Contexte

**Par défaut**, le site fonctionne en mode "simulation locale" :
- ✅ Chaque étudiant joue dans son navigateur
- ✅ Des bots simulent l'activité des autres équipes
- ❌ Les étudiants ne voient PAS les vraies actions de leurs camarades
- ❌ Si on rafraîchit, on perd sa progression

**Avec Supabase**, vous activez le mode **"Vrai Temps Réel"** :
- ✅ Tous les étudiants voient les actions des autres EN DIRECT
- ✅ Le chat d'équipe fonctionne réellement entre étudiants
- ✅ Le classement se synchronise en temps réel
- ✅ La progression est sauvegardée (même si on rafraîchit)

---

## 🤔 Est-ce Nécessaire ?

### Utilisez le Mode Local Si :
- 📚 Session de découverte/démonstration
- 👥 Petit groupe (< 6 étudiants dans la même salle)
- ⏱️ Session courte (20-30 min)
- 🔒 Pas de compte/setup à gérer

### Utilisez Supabase Si :
- 🌐 Étudiants dans différentes salles/à distance
- 👥 Grand groupe (> 10 étudiants)
- ⏱️ Session longue ou sur plusieurs jours
- 💾 Vous voulez sauvegarder les résultats
- 🏆 Vous voulez un vrai classement persistant

---

## 🚀 Activation Rapide (15 minutes)

### Étape 1 : Créer un Compte Supabase (Gratuit)

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez "Start your project"
3. Créez un compte (avec GitHub recommandé)
4. ✅ **Gratuit jusqu'à 50,000 requêtes/mois** (largement suffisant !)

### Étape 2 : Créer un Projet

1. Cliquez "New Project"
2. Remplissez :
   - **Name** : `ai-security-arena`
   - **Database Password** : Générez-en un fort (notez-le !)
   - **Region** : Choisissez le plus proche (ex: Europe West)
3. Cliquez "Create new project"
4. ⏱️ Attendez 2-3 minutes (le projet se configure)

### Étape 3 : Créer les Tables

1. Dans Supabase, allez dans **"SQL Editor"** (menu gauche)
2. Cliquez "New Query"
3. Copiez-collez ce code SQL :

```sql
-- Table des joueurs
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  team TEXT NOT NULL CHECK (team IN ('red', 'blue')),
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des attaques
CREATE TABLE attacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  player_name TEXT NOT NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  points INTEGER NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des défenses
CREATE TABLE defenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  player_name TEXT NOT NULL,
  attack_id UUID NOT NULL,
  method TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  points INTEGER NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des messages de chat
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  player_name TEXT NOT NULL,
  team TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (sécurité)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE attacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE defenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Permettre la lecture publique (pour le TP)
CREATE POLICY "Allow public read access" ON players FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON players FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON attacks FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON attacks FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON defenses FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON defenses FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON chat_messages FOR INSERT WITH CHECK (true);
```

4. Cliquez "Run" ou appuyez sur Ctrl+Enter
5. ✅ Vérifiez "Success. No rows returned" (c'est normal !)

### Étape 4 : Récupérer les Clés API

1. Dans Supabase, allez dans **"Settings"** → **"API"**
2. Notez ces deux valeurs :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon public key** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (longue clé)

### Étape 5 : Configurer l'Application

Vous avez deux options :

#### Option A : Variables d'Environnement (Recommandé)

1. Créez un fichier `.env` à la racine du projet :
   ```bash
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

2. Redémarrez le serveur local :
   ```bash
   npm run dev
   ```

#### Option B : Configuration Directe (Plus Simple pour Test)

1. Ouvrez le fichier de configuration de Supabase (une fois créé dans le code)
2. Remplacez les valeurs par vos clés

### Étape 6 : Tester

1. Lancez le site
2. Créez un compte "TestRouge" dans l'équipe rouge
3. Ouvrez un autre onglet (navigation privée)
4. Créez un compte "TestBleu" dans l'équipe bleue
5. Faites une attaque avec TestRouge
6. ✅ Vérifiez que TestBleu voit l'attaque apparaître !

---

## 📊 Fonctionnalités Activées avec Supabase

### 1. 🔄 Synchronisation Temps Réel
- Les attaques apparaissent instantanément pour l'équipe adverse
- Le classement se met à jour en direct
- Le fil d'activité est partagé entre tous

### 2. 💬 Chat d'Équipe Fonctionnel
- Les membres de chaque équipe peuvent vraiment communiquer
- Messages en temps réel (< 1 seconde de latence)
- Coordination stratégique possible

### 3. 💾 Persistance des Données
- Si un étudiant rafraîchit, il retrouve sa session
- Possibilité de reprendre le TP plus tard
- Historique complet des actions

### 4. 📈 Statistiques Post-Session
- Vous pouvez exporter les données depuis Supabase
- Analysez quelles attaques ont le mieux fonctionné
- Identifiez les étudiants les plus actifs

---

## 🎛️ Gestion de Session

### Réinitialiser Entre Deux TPs

**Option 1 : Depuis Supabase Dashboard**
1. Allez dans "Table Editor"
2. Pour chaque table (players, attacks, defenses, chat_messages)
3. Cliquez sur les 3 points → "Truncate table"

**Option 2 : Avec SQL**
```sql
TRUNCATE players, attacks, defenses, chat_messages CASCADE;
```

### Exporter les Résultats

1. Dans Supabase → "Table Editor"
2. Sélectionnez une table (ex: `players`)
3. Cliquez "Export as CSV"
4. Analysez dans Excel/Google Sheets

---

## 💰 Coûts (Spoiler : Gratuit)

### Plan Gratuit Supabase
- ✅ 50,000 requêtes/mois
- ✅ 500 MB stockage
- ✅ Temps réel illimité
- ✅ Parfait pour 20-30 étudiants sur plusieurs sessions

### Estimation pour 1 TP (30 min, 20 étudiants)
- ~50 requêtes par étudiant
- Total : ~1,000 requêtes
- **Vous pouvez faire 50 sessions/mois gratuitement !**

---

## 🔒 Sécurité et Confidentialité

### ⚠️ Important à Savoir

**Ce que le site collecte :**
- Pseudos des étudiants (pas de vrais noms obligatoires !)
- Attaques et défenses créées
- Messages de chat (uniquement dans l'équipe)

**Ce que le site NE collecte PAS :**
- ❌ Emails
- ❌ Adresses IP
- ❌ Données personnelles sensibles
- ❌ Mots de passe (pas de système d'authentification)

### Conformité RGPD (Europe)

**Pour être conforme :**
1. Informez les étudiants que leurs actions sont stockées
2. Demandez-leur d'utiliser des pseudos (pas leurs vrais noms)
3. Supprimez les données après le TP (truncate tables)
4. Ne partagez jamais les clés API publiquement

**Mentions à ajouter :**
```
"Dans le cadre de ce TP, vos actions (attaques, défenses, messages) 
sont temporairement stockées pour permettre l'interaction en temps réel. 
Utilisez un pseudo. Les données seront supprimées après la session."
```

---

## 🛠️ Dépannage

### ❌ "Failed to connect to Supabase"
- Vérifiez que l'URL et la clé sont correctes
- Vérifiez que les tables sont bien créées
- Testez depuis Supabase Dashboard → API Docs → test endpoint

### ❌ "Row Level Security policy violation"
- Retournez dans SQL Editor
- Revérifiez que les policies sont créées (voir Étape 3)
- Exécutez à nouveau les `CREATE POLICY` si besoin

### ❌ Les données n'apparaissent pas en temps réel
- Vérifiez que vous avez activé Realtime :
  - Database → Replication → Activez pour chaque table
- Rafraîchissez la page

### ❌ "Too many requests"
- Vous avez dépassé le quota gratuit (rare !)
- Attendez le mois suivant ou passez au plan payant ($25/mois)

---

## 🎓 Comparaison Mode Local vs Supabase

| Fonctionnalité | Mode Local | Avec Supabase |
|----------------|------------|---------------|
| **Installation** | ⭐ Immédiate | ⭐⭐ 15 min setup |
| **Interaction réelle** | ❌ Simulée (bots) | ✅ Vraie (temps réel) |
| **Chat d'équipe** | ❌ Non fonctionnel | ✅ Fonctionnel |
| **Persistance** | ❌ Perdu au refresh | ✅ Sauvegardé |
| **Coût** | ✅ Gratuit | ✅ Gratuit (jusqu'à 50k req) |
| **Idéal pour** | Démo, petit groupe | Vrai TP, grand groupe |

---

## 📚 Prochaines Étapes

### Si Vous Voulez Aller Plus Loin

1. **Authentification** : Demander un email pour rejoindre
2. **Sessions privées** : Code de session pour isoler les groupes
3. **Analytics avancés** : Graphiques d'efficacité des défenses
4. **Replay** : Rejouer une session passée
5. **Tournois** : Plusieurs manches avec système de points cumulés

Je peux vous aider à implémenter ces fonctionnalités si besoin !

---

## 🆘 Besoin d'Aide ?

**Pour activer Supabase dans votre projet :**
1. Lancez l'application Figma Make
2. Dites "Je veux activer Supabase"
3. L'assistant vous guidera pas à pas

**Ressources :**
- [Documentation Supabase](https://supabase.com/docs)
- [Tutoriel Realtime](https://supabase.com/docs/guides/realtime)

---

**🎯 TL;DR : Supabase est optionnel mais recommandé pour une vraie expérience collaborative !**
