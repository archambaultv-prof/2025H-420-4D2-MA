# Exporter et importer une classe

Il est souvent nécessaire de découper votre code en plusieurs fichiers pour
faciliter la maintenance et la réutilisation. Les modules vous permettent de
faire cela en JavaScript/Node.js. Il existe deux systèmes de modules en
JavaScript/Node.js :

- **CommonJS** historique et encore très utilisé avec Node.js
- **ES Modules (ESM)** norme plus récente, souvent utilisée dans les projets modernes

Dans ce cours, nous allons nous concentrer sur les **ES Modules**. Mais il est bon de
savoir que Node.js supporte les deux systèmes de modules et surtout de savoir
lire du code qui utilise CommonJS.

## Exporter avec CommonJS

Avec CommonJS, vous pouvez exporter une classe en utilisant `module.exports` :

```javascript
// Compteur.js
class Compteur {
  constructor() {
    this.count = 0;
  }

  incrementer() {
    return this.count++;
  }
}

module.exports = Compteur;
```

`module.exports` est une propriété de l'objet `module` qui est disponible dans
chaque fichier CommonJS. Vous pouvez y assigner n'importe quel type de valeur
pour l'exporter.

La classe `Compteur` est maintenant exportée et peut être importée dans un autre
fichier :

```javascript
// index.js
const Compteur = require('./Compteur');

const monCompteur = new Compteur();

console.log(monCompteur.incrementer()); // Affiche 0
console.log(monCompteur.incrementer()); // Affiche 1
console.log(monCompteur.incrementer()); // Affiche 2
```

### Exporter plusieurs éléments

Il est possible d'exporter plusieurs éléments en les assignant à un objet :

```javascript
// Compteur.js
class Compteur {
  constructor() {
    this.count = 0;
  }

  incrementer() {
    return this.count++;
  }
}

class AutreClasse {
  // ...
}

module.exports = { Compteur, AutreClasse };
```

La syntaxe `{ Compteur, AutreClasse }` crée un objet avec deux propriétés
`Compteur` et `AutreClasse` qui contiennent les classes respectives. Vous pouvez
ensuite importer ces classes dans un autre fichier :

```javascript
// index.js
const { Compteur, AutreClasse } = require('./Compteur');

const monCompteur = new Compteur();
const autreObjet = new AutreClasse();
```

## Exporter avec ES Modules

Avec les ES Modules, vous pouvez exporter une classe en utilisant `export` :

```javascript
// Compteur.js
export class Compteur {
  constructor() {
    this.count = 0;
  }

  incrementer() {
    return this.count++;
  }
}
```

La classe `Compteur` est maintenant exportée et peut être importée dans un autre
fichier :

```javascript
// index.js
import { Compteur } from './Compteur.js';

const monCompteur = new Compteur();

console.log(monCompteur.incrementer()); // Affiche 0
console.log(monCompteur.incrementer()); // Affiche 1
console.log(monCompteur.incrementer()); // Affiche 2
```

Vous pouvez aussi exporter plusieurs éléments en utilisant `export` plusieurs
fois :

```javascript
// Compteur.js

export class Compteur {
  constructor() {
    this.count = 0;
  }

  incrementer() {
    return this.count++;
  }
}

export class AutreClasse {
  // ...
}
```

Il est aussi possible de d'abord déclarer les classes puis de les exporter à la
fin du fichier :

```javascript
// Compteur.js

class Compteur {
  constructor() {
    this.count = 0;
  }

  incrementer() {
    return this.count++;
  }
}

class AutreClasse {
  // ...
}

export { Compteur, AutreClasse };
```

Pour plus d'informations sur les ES Modules, consultez la [documentation mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export).