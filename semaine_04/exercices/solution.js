const express = require('express');
const knex = require('knex');

const app = express();
const port = 3000;

// Configuration de Knex pour SQLite3
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data.sqlite3'
  },
  useNullAsDefault: true
});

app.use(express.json());

// Route de bienvenue
app.get('/', (req, res) => {
  res.send('Bienvenue sur notre serveur Express.js!');
});

// Route pour créer la base de données et la table users
app.post('/create_database', async (req, res) => {
  try {
    await db.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('name');
    });

    await db('users').insert([
      { name: 'Alice' },
      { name: 'Bob' },
      { name: 'Charlie' }
    ]);

    res.send('Base de données créée avec succès!');
  } catch (error) {
    res.status(500).send('Erreur lors de la création de la base de données: ' + error.message);
  }
});

// Route pour afficher les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des utilisateurs: ' + error.message);
  }
});

// Route pour ajouter un utilisateur
app.post('/add_user', async (req, res) => {
  const { name } = req.body;
  try {
    await db('users').insert({ name });
    res.send('Utilisateur ajouté avec succès!');
  } catch (error) {
    res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur: ' + error.message);
  }
});

// Route pour obtenir un utilisateur par son identifiant
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db('users').where({ id }).first();
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Utilisateur non trouvé');
    }
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération de l\'utilisateur: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Serveur Express.js écoutant sur le port ${port}`);
});
