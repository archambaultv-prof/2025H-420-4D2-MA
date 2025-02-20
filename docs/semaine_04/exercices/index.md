---
hide:
  - toc
---

# Exercices formatifs semaine 4

## Installer Express.js

1. Créez un nouveau projet Node.js
2. Installez Express.js (sauvegardez-le dans les dépendances de votre projet)
3. Créez un serveur Express.js qui écoute sur le port 3000
4. Créez une route `/` qui renvoie un message de bienvenue

## Ajouter une base de données SQLite3 avec Knex

1. Installez SQLite3 et Knex (sauvegardez-les dans les dépendances de votre projet)
2. Créez une route pour générer une base de données SQLite3
      1. La route utilise la méthode HTTP `POST` et le chemin `/createdatabase`
      2. La route doit créer une table `users` avec les colonnes `id` (auto-incrémenté) et `name` (texte)
      3. Votre code doit insérez quelques utilisateurs dans la table
      4. Retournez un message indiquant que la base de données a été créée ou qu'une erreur est survenue
3. Créez une route pour afficher les utilisateurs
      1. La route utilise la méthode HTTP `GET` et le chemin `/users`
      2. La route doit renvoyer la liste des utilisateurs sous forme de tableau JSON
4. Créez une route pour ajouter un utilisateur
      1. La route utilise la méthode HTTP `POST` et le chemin `/adduser`. Le nom
         de l'utilisateur est envoyé dans le corps de la requête. (voir [express.json()](https://expressjs.com/en/api.html#express.json))
      2. La route doit ajouter un utilisateur à la base de données
      3. Retournez un message indiquant que l'utilisateur a été ajouté ou qu'une erreur est survenue

      Concernant `express.json()`, il s'agit d'un middleware qui permet lire le
      corps de la requête en JSON et ajoute le résultat à `req.body`. Vous pouvez
      simplement l'ajouter à votre application Express.js comme suit:

      ```javascript
      app.use(express.json());

      app.post('/adduser', (req, res) => {
        const name = req.body.name;
        // ...
      });
      ```

5. Créez une route pour obtenir un utilisateur par son identifiant (vous pouvez
   obtenir la liste des identifiants avec la route `/users`)
      1. La route utilise la méthode HTTP `GET` et le chemin `/user/:id` (voir [Route parameters](https://expressjs.com/en/guide/routing.html#route-parameters))
      2. La route doit renvoyer l'utilisateur correspondant à l'identifiant `id` sous forme de JSON
      3. Si l'utilisateur n'existe pas, retournez un message d'erreur

Vous pouvez tester depuis votre navigateur pour les méthodes `GET`. Pour les
méthodes `POST`, vous pouvez utiliser curl depuis votre terminal. (Il existe
des outils bien plus conviviaux comme [Postman](https://www.postman.com/) ou
[Insomnia](https://insomnia.rest/)).

Voici comment utiliser curl pour créer une base de données:

```bash
curl -X POST http://localhost:3000/createdatabase
```

Voici comment utiliser curl pour envoyer un nom d'utilisateur à votre serveur:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "Alice"}' http://localhost:3000/add_user
```

Il est aussi possible d'utiliser curl pour obtenir des informations depuis votre serveur:

```bash
curl http://localhost:3000/users
```

```bash
curl http://localhost:3000/user/1
```
