# Express js

## Introduction

Express.js est un framework web minimaliste pour Node.js. Il est principalement
conçu pour faciliter la gestion des requêtes HTTP et des routes. Par exemple
le code suivant crée un serveur web qui répond à une requête GET sur la route
`/` avec le texte `Hello World!`:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

Express.js est basé sur les middlewares. Un middleware est simplement une
fonction qui gère la requête HTTP. Le concept est simple, chaque middleware est
associé à une route et une méthode HTTP. Il est aussi possible de créer des
middlewares qui s'appliquent à toutes les routes. Il est également possible
pour une même route et/ou méthode HTTP d'avoir plusieurs middlewares qui
s'exécutent les uns après les autres.

Les middlewares sont des fonctions qui prennent deux, trois ou quatre arguments. Pour
deux ou trois arguments, les arguments sont:

- `req`: l'objet représentant la requête HTTP
- `res`: l'objet représentant la réponse HTTP
- `next`: la fonction qui appelle le middleware suivant

Un middleware avec quatre arguments est un middleware de gestion d'erreur. Les
arguments sont:

- `err`: l'erreur qui a été lancée
- `req`: l'objet représentant la requête HTTP
- `res`: l'objet représentant la réponse HTTP
- `next`: la fonction qui appelle le middleware suivant

Par exemple, le code suivant affiche la méthode HTTP et l'URL de chaque requête
reçue et ce pour toutes les routes:

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

L'usage de `next()` est important, car il permet de passer la main au middleware
suivant. *Si `next()` n'est pas appelé, la requête reste en attente et le client
ne reçoit jamais de réponse.*

### Documentation officielle

La documentation officielle d'Express.js est très complète et bien faite. Vous
pouvez choisir le français ou l'anglais dans le menu déroulant en haut à droite
de la page. Vous pouvez consulter la documentation
[ici](https://expressjs.com/fr/).

Notez que la documentation en français est par fois incomplète ou obsolète. Si
vous ne trouvez pas ce que vous cherchez, vous pouvez toujours consulter la
documentation en anglais.

## Installation

Voir la [documentation
officielle](https://expressjs.com/fr/starter/installing.html).

## Routes

Pour les routes, voir [ici](https://expressjs.com/fr/starter/basic-routing.html).

## Envoi de fichiers statiques

Pour l'envoi de fichiers, voir [ici](https://expressjs.com/fr/starter/static-files.html).
