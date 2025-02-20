# Sqlite3 et Knex

## Sqlite3

Sqlite3 est une base de données relationnelle qui est stockée dans un fichier.
Elle est très facile à utiliser et ne nécessite pas de configuration.

La documentation officielle de Sqlite3 est disponible
[ici](https://www.sqlite.org/docs.html). Dans le cadre de ce cours, nous allons
utiliser Knex pour interagir avec Sqlite3.

## Knex

Knex est un constructeur de requêtes SQL pour Node.js. Il permet de créer des
requêtes SQL de manière programmatique. Les deux grand avantages de Knex sont:

- Permettre de construire les requêtes SQL sans avoir à écrire du SQL à la main.
- Fonctionne avec plusieurs bases de données: Sqlite3, MySQL, PostgreSQL, etc.

La documentation officielle de Knex est disponible
[ici](http://knexjs.org/).

### Connection à une base de données Sqlite3

Pour se connecter à une base de données Sqlite3 avec Knex, il suffit de créer
une instance de Knex de la manière suivante:

```javascript
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data.db'
  }
});
```

Dans cet exemple, nous créons une instance de Knex qui se connecte à la base de
données `data.db` qui est un fichier Sqlite3.

### Schema

Knex permet de créer des schémas de base de données de manière programmatique.
Par exemple, pour créer une table `users` avec une colonne `name` de type
`string`, il suffit de faire:

```javascript
await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name');
    });
```

La plupart des fonctions de Knex renvoient une promesse, il est donc important
d'utiliser `await` pour attendre la résolution de la promesse.

### Requêtes

Voici quelques exemples de requêtes SQL avec Knex:

```javascript
// Insertion
const insertedRows = await knex('users').insert({name: 'Alice'});
// Sélection
const selectedRows = await knex('users').select('*');
// Mise à jour
await knex('users').where({id: 1}).update({name: 'Bob'});
// Suppression
await knex('users').where({id: 1}).del();
```

### Alias

Il est possible d'utiliser des alias pour les tables et les colonnes. Par
exemple, pour sélectionner la colonne `name` de la table `users` et la renommer
en `username`, il suffit de faire:

```javascript
const selectedRows = await knex('users').select('name as username');
```

Il est aussi possible d'utiliser un objet javascript pour renommer plusieurs
colonnes:

```javascript
const selectedRows = await knex('users').select({name: 'username', id: 'user_id'});
```
