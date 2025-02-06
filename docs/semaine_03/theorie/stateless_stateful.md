# Stateless et Stateful

## Définitions et concepts

- **Stateless (Sans état)**: Une fonction ou un objet est dit "stateless"
s'il ne conserve aucune information (état) entre les appels. Il ne dépend que de
ses arguments et retourne un résultat sans modifier de variables internes. Les
avantages sont :

    - Facile à tester.
    - Prévisible et sans effets de bord.
    - Réutilisable.
  
- **Stateful (Avec état)**: Une fonction ou un objet est "stateful" s'il garde
une information interne qui peut changer au fil du temps. Cela signifie que son
comportement peut varier en fonction de son état interne. Exemple : un compteur
qui se souvient de sa valeur.

## Exemples

Exemple de fonctions sans état :

```javascript
function addition(a, b) {
  return a + b;
}

console.log(addition(2, 3)); // Affiche 5
```

Exemple d'objet avec état :

```javascript
class Compteur {
  constructor() {
    this.count = 0;
  }

  incrementer() {
    return this.count++;
  }
}

const monCompteur = new Compteur();

console.log(monCompteur.incrementer()); // Affiche 0
console.log(monCompteur.incrementer()); // Affiche 1
console.log(monCompteur.incrementer()); // Affiche 2
```

La classe Compteur garde une valeur interne (this.count) qui change au fil du
temps. Le comportement de l'objet dépend de cet état interne. 

Voici un exemple de fonctions avec état :

```javascript
function compteur() {
  let count = 0;

  return function() {
    return count++;
  };
}

const incrementer = compteur();

console.log(incrementer()); // Affiche 0
console.log(incrementer()); // Affiche 1
console.log(incrementer()); // Affiche 2
```

La fonction `compteur` retourne une fonction qui garde une variable `count` dans
sa portée. Cela permet de garder un état interne entre les appels de la fonction
`incrementer`. Il est donc bel et bien possible pour une fonction d'être
stateful sans la présence de variables globales.
