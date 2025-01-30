# JavaScript asynchrone dans Node.js

JavaScript étant à la base un langage **monothread**, Node.js utilise la
**boucle d’événements** (*event loop*), mise en œuvre par la librairie
**libuv**, pour gérer l’exécution du code asynchrone.  

Tout comme dans un navigateur, on a toujours le concept de **pile d’exécution**,
de **file d’attente**, et d’un **Event Loop** qui orchestre l’exécution.
Toutefois, les APIs asynchrones disponibles sont spécifiques à Node.js (accès
disque, réseau, etc.), plutôt qu’aux Web APIs (comme `fetch` dans un
navigateur).


##  Le modèle asynchrone en Node.js

### Le rôle de libuv

- **libuv** est une bibliothèque C utilisée par Node.js pour la gestion **multi-plateforme** des I/O asynchrones.  
- Elle gère la **boucle d’événements**, les **threads** en arrière-plan (Thread Pool) pour des tâches comme l’accès au système de fichiers, le chiffrement, DNS, etc.

### Les APIs asynchrones de Node.js

Contrairement à un navigateur, Node.js n’a pas de DOM.  
En revanche, Node.js propose des modules asynchrones pour :

- **fs** (File System) : lecture/écriture de fichiers.
- **http** : création de serveurs HTTP, requêtes sortantes, etc.
- **net** : sockets bas niveau pour des connexions réseau.
- **crypto** : opérations cryptographiques.
- etc.

Toutes ces APIs suivent des **patrons asynchrones** (avec callbacks, Promises, `async/await`).

---

## Callbacks et « callback hell » dans Node.js

### Exemple avec le module `fs`

Historiquement, la majorité des fonctions Node.js utilisaient des **callbacks**
suivant la convention d’erreur en premier (error-first callback) :

```js
const fs = require('fs');

fs.readFile('monFichier.txt', 'utf8', (err, data) => {
  if (err) {
    return console.error("Erreur de lecture :", err);
  }
  console.log("Contenu du fichier :", data);
});
```

Le premier argument de la fonction de rappel représente une éventuelle erreur et
le deuxième argument représente le résultat de l’opération asynchrone.

### L'enchâssement de callbacks

Lorsqu’on a plusieurs opérations asynchrones à effectuer en séquence, on peut
tomber dans le piège du **« callback hell »** :

Le code suivant lit trois fichiers en séquence et affiche leur contenu :
```js
fs.readFile('fichier1.txt', 'utf8', (err, data1) => {
  if (err) {
    return console.error("Erreur de lecture :", err);
  }
  fs.readFile('fichier2.txt', 'utf8', (err, data2) => {
    if (err) {
      return console.error("Erreur de lecture :", err);
    }
    fs.readFile('fichier3.txt', 'utf8', (err, data3) => {
      if (err) {
        return console.error("Erreur de lecture :", err);
      }
      console.log("Contenu des fichiers :", data1, data2, data3);
    });
  });
});
```

La logique de l’application devient difficile à suivre et à maintenir.

---

## Promesses (*Promises*) en Node.js

Pour rendre le code asynchrone plus lisible, Node.js a progressivement adopté
les Promises. Une promesse est un objet qui représente le résultat éventuel
(réussi ou échoué) d’une opération asynchrone. En d’autres termes, c’est comme
un contrat qui dit : “Je vais faire quelque chose qui prend du temps et, quand
j’aurai fini, je te donnerai soit un succès (resolve), soit une erreur
(reject).”

Voici les points clés à retenir :

- **Asynchrone** : une promesse gère du code qui s’exécute en arrière-plan, sans
bloquer le reste du programme. 
- **Trois états** : 
    - en attente (pending) : l’opération est en cours
    - réussie (fulfilled) : l’opération s’est terminée avec succès
    - échouée (rejected) : l’opération a rencontré une erreur. 
- **Méthodes then() et catch()** : then() est appelée quand la promesse est
réussie et reçoit la valeur de retour, catch() est appelée quand la promesse a
échoué et reçoit l’erreur.

### Construction d’une promesse

Pour créer une promesse, on utilise le constructeur `Promise` qui prend une
fonction de rappel avec deux arguments : `resolve` et `reject`. Voici un exemple
qui simule une opération asynchrone de lecture de fichier :

```js
const fs = require('fs');

function lireFichier(nomFichier) {
  return new Promise((resolve, reject) => {
    fs.readFile(nomFichier, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

lireFichier('monFichier.txt')
  .then(data => console.log("Contenu du fichier :", data))
  .catch(err => console.error("Erreur de lecture :", err));
```

Si vous voulez retourner une valeur directement, vous pouvez utiliser
`Promise.resolve(valeur)` ou `Promise.reject(erreur)`. Par exemple :

```js
function getNombreAleatoire() {
  return Promise.resolve(Math.random());
}

getNombreAleatoire().then(nombre => console.log("Nombre aléatoire :", nombre));
```

### Chaînage de promesses

Voici un exemple classique où on enchaîne plusieurs opérations asynchrones.
D’abord, on va illustrer la version callback hell, puis la version avec Promises
(qui rend le code plus linéaire et lisible).

Imaginons qu’on ait trois fonctions asynchrones (par exemple, récupérer un
utilisateur, puis ses articles, puis les commentaires d’un de ses articles) qui
s’utilisent avec des callbacks :

```js linenums="1"
function getUser(userId, callback) {
  setTimeout(() => {
    console.log("getUser terminé");
    // On simule la récupération d’un utilisateur
    callback(null, { id: userId, name: "Alice" });
  }, 500);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    console.log("getPosts terminé");
    // On simule la récupération de posts liés à l’utilisateur
    callback(null, [{ postId: 101, title: "Mon premier article" }]);
  }, 500);
}

function getComments(postId, callback) {
  setTimeout(() => {
    console.log("getComments terminé");
    // On simule la récupération de commentaires pour un article
    callback(null, ["Super !", "Merci pour l'article"]);
  }, 500);
}
```

Pour enchaîner ces trois opérations (récupérer l’utilisateur, puis ses articles,
puis les commentaires du premier article), on peut faire :
```js linenums="1"
getUser(1, function (err, user) {
  if (err) {
    console.error(err);
    return;
  }
  getPosts(user.id, function (err, posts) {
    if (err) {
      console.error(err);
      return;
    }
    getComments(posts[0].postId, function (err, comments) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Commentaires récupérés :", comments);
    });
  });
});
```

Maintenant, les mêmes fonctions, mais en retournant des Promesses au lieu
d’utiliser des callbacks :
```js linenums="1"
function getUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("getUser terminé");
      // Simulation de la récupération d’un utilisateur
      const user = { id: userId, name: "Alice" };
      resolve(user); // on appelle resolve quand tout va bien
    }, 500);
  });
}

function getPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("getPosts terminé");
      // Simulation de la récupération de posts
      const posts = [{ postId: 101, title: "Mon premier article" }];
      resolve(posts);
    }, 500);
  });
}

function getComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("getComments terminé");
      // Simulation de la récupération de commentaires
      const comments = ["Super !", "Merci pour l'article"];
      resolve(comments);
    }, 500);
  });
}
```

Pour enchaîner les opérations, on peut chaîner les appels grâce aux méthodes
`then()` et `catch()` :

```js linenums="1"
getUser(1)
  .then((user) => {
    return getPosts(user.id);
  })
  .then((posts) => {
    return getComments(posts[0].postId);
  })
  .then((comments) => {
    console.log("Commentaires récupérés :", comments);
  })
  .catch((err) => {
    console.error(err);
  });
```

### `Promise.all()`

Si vous avez plusieurs promesses à exécuter en parallèle, vous pouvez utiliser
`Promise.all([...])` qui prend un tableau de promesses et renvoie une nouvelle
promesse qui est résolue quand toutes les promesses du tableau sont résolues.

```js linenums="1"
Promise.all([getUser(1), getPosts(1), getComments(101)])
  .then(([user, posts, comments]) => {
    console.log("Utilisateur :", user);
    console.log("Articles :", posts);
    console.log("Commentaires :", comments);
  })
  .catch((err) => {
    console.error(err);
  });
```

Par contre, si une seule des promesses est rejetée, la promesse retournée par
`Promise.all()` sera rejetée. Aussi l'ordre d'exécution des promesses n'est pas
garanti.


### Une promesse sans `then` ni `catch`

Si vous n'appelez ni `then` ni `catch` sur une promesse, elle sera exécutée
quand même. S'il y a une erreur, elle sera rejetée sans être gérée, ce qui peut
provoquer des erreurs non gérées (unhandled rejections). Si la promesse réussit
mais qu'on ne fait rien avec le résultat, cela ne plante pas, mais c’est
inutile.

### `catch` est un `then` spécial

`catch` est en fait un raccourci pour `then(undefined, onRejected)`. Cela signifie
que `catch` peut être utilisé pour gérer les erreurs de n’importe quelle promesse
dans la chaîne de promesses.

### `finally`

`finally` est une méthode qui est appelée à la fin de la chaîne de promesses,
qu’elles soient résolues ou rejetées. Elle est utile pour effectuer des
opérations de nettoyage ou de finalisation, par exemple pour fermer une
connexion réseau ou un fichier.

```js linenums="1"
getUser(1)
  .then((user) => {
    console.log("Utilisateur :", user);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log("Opération terminée");
  });
```

### Avantages des Promesses

- Lisibilité : plus besoin d’imbriquer des fonctions callback dans d’autres callbacks.
- Gestion centralisée des erreurs : on peut catcher les erreurs à la fin avec un simple .catch(...).
- Chaînage plus clair : chaque then reçoit le résultat du précédent et peut
  renvoyer une nouvelle promesse ou une valeur.

### Références

- [Promises - MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise)

## Async/Await

Les Promises sont une amélioration par rapport aux callbacks, mais elles peuvent
devenir verbeuses lorsqu’on enchaîne plusieurs opérations asynchrones. Pour
rendre le code encore plus lisible, JavaScript propose les mots-clés `async` et
`await`.

- `async` : déclare une fonction asynchrone qui retourne une Promesse.
- `await` : attend la résolution d’une Promesse. Il ne peut être utilisé que
  dans une fonction déclarée avec `async`.

Voici comment on pourrait réécrire l’exemple précédent avec `async` et `await` :

```js linenums="1"
async function main() {
  try {
    const user = await getUser(1);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].postId);
    console.log("Commentaires récupérés :", comments);
  } catch (err) {
    console.error(err);
  }
}

main();
```

L'order dans lequel les opérations sont effectuées est plus clair, et on peut
gérer les erreurs avec un simple bloc `try/catch`. Notez que chaque `await` 
ne s'exécute qu'après que l'instruction `await` précédente ait été résolue.

### Gestion des erreurs

Dans une fonction `async`, les erreurs peuvent être gérées avec un bloc
`try/catch`. C'est l'équivalent de la méthode `catch()` d'une Promesse. Si une
fonction `async` lève une erreur qui n'est pas gérée, la promesse définie par la
fonction sera rejetée et l'erreur sera propagée.

### Recommandations et bonnes pratiques

- Toujours gérer les erreurs : entourez votre code await d’un try/catch, ou
retournez des promesses correctement rejetées afin de ne pas avoir de rejets non
gérés (unhandled rejections).
- Éviter les boucles `for` qui font trop d’opérations `await` en série si vous
voulez du parallélisme. Il peut être préférable de lancer plusieurs promesses
simultanément et de faire un `await Promise.all([...])` si vous n’avez pas besoin
de l’ordre d’exécution.