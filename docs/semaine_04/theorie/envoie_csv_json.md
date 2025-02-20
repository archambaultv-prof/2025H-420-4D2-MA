# Envoie de données CSV et JSON

Il est assez facile avec ExpressJS d'envoyer des données au format CSV ou JSON.
Dans cet exemple, nous allons voir comment envoyer des données CSV et JSON.

## CSV

Pour envoyer des données au format CSV, il suffit de définir le type de contenu
de la réponse HTTP avec la méthode `res.set()` et d'envoyer les données avec la
méthode `res.send()`.

```javascript
const express = require('express');
const app = express();

app.get('/csv', (req, res) => {
  res.set('Content-Type', 'text/csv');
  res.send('name,age\nAlice,25\nBob,30\nCharlie,35\n');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

Dans cet exemple, nous définissons le type de contenu de la réponse HTTP avec
`res.set('Content-Type', 'text/csv')` et nous envoyons les données avec
`res.send('name,age\nAlice,25\nBob,30\nCharlie,35\n')`.

## JSON

Pour envoyer des données au format JSON, il suffit d'utiliser la méthode
`res.json()` qui gère automatiquement le type de contenu de la réponse HTTP.

```javascript
const express = require('express');
const app = express();

app.get('/json', (req, res) => {
  res.json([
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
  ]);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

## Téléchargement

Les deux exemples ci-dessus envoient les données directement dans le corps de la
réponse HTTP. Si vous souhaitez envoyer un fichier CSV ou JSON, vous pouvez
utiliser la méthode `res.download()`.

```javascript
const express = require('express');
const app = express();

app.get('/csv', (req, res) => {
  res.download('data.csv');
});

app.get('/json', (req, res) => {
  res.download('data.json');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

Ceci suppose que les fichiers `data.csv` et `data.json` sont présents dans le
répertoire de travail du serveur. Si les données sont générées dynamiquement,
vous pouvez utiliser la méthode `res.attachment()` pour définir le nom du fichier
à télécharger.

```javascript
const express = require('express');
const app = express();

app.get('/csv', (req, res) => {
  // Définit Content-Disposition: attachment; filename="data.csv"
  // et Content-Type: text/csv basé sur l'extension du fichier
  res.attachment('data.csv');
  res.send('name,age\nAlice,25\nBob,30\nCharlie,35\n');
});

app.get('/json', (req, res) => {
  // Définit Content-Disposition: attachment; filename="data.json"
  // et Content-Type: application/json basé sur l'extension du fichier
  res.attachment('data.json');
  res.json([
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
  ]);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

## Example avec un base de données

```javascript
const express = require('express');
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite3'
  }
});

const app = express();

app.get('/csv', async (req, res) => {
  try {
    // Interroger la table "users" pour récupérer les colonnes "name" et "age"
    const rows = await knex('users').select('name', 'age');

    // Générer le contenu CSV avec une ligne d'en-tête
    let csv = 'name,age\n';
    rows.forEach(row => {
      csv += `${row.name},${row.age}\n`;
    });

    // Définir les en-têtes pour forcer le téléchargement du fichier
    res.attachment('data.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur de base de données');
  }
});

app.listen(3000, () => {
  console.log('Le serveur écoute sur le port 3000');
});
```
