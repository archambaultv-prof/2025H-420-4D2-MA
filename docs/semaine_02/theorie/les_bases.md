# Introduction à Javascript

##  Qu’est-ce que JavaScript ?

### Brève histoire et utilisation

JavaScript a été développé en 1995 par Brendan Eich pour le navigateur Netscape.
Aujourd’hui, JavaScript est standardisé via l’ECMAScript et connaît des mises à
jour régulières (ES6/ES2015, ES7, etc.).

Les principales utilisations de JavaScript sont :

- Interactivité dans les pages web (animations, formulaires, etc.)
- Applications côté serveur avec **Node.js**
- Applications mobiles (React Native, Ionic, etc.)
- Développement d’applications desktop (Electron)

---

## JavaScript dans une page web

Au départ, JavaScript était uniquement utilisé dans un navigateur pour ajouter
de l'interactivité à une page web. Pour une façon simple d'exécuter du
JavaScript dans un navigateur, on crée un fichier `.html` contenant une balise
`<script>`.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Mon premier script JavaScript</title>
</head>
<body>
  <h1>Bonjour JavaScript !</h1>

  <script>
    var x = 1;
    var y = 2;

    console.log("Bonjour depuis le script !");
    console.log(x + y);
    alert("Hello World !");
  </script>
</body>
</html>
```

Vous pouvez ouvrir le fichier html dans un navigateur pour voir le résultat. Pour
mieux voir les messages de la console, ouvrez la console de développement de
votre navigateur (F12).

---

## JavaScript et node.js
Puisque c'était le seul langage de programmation disponible dans les
navigateurs, JavaScript est devenu un langage de programmation très populaire.
De plus, les interpréteurs JavaScript des navigateurs sont devenus très
performants. Ainsi, en 2009, Ryan Dahl a créé Node.js, une plateforme permettant
de faire fonctionner du JavaScript côté serveur. Il a adapté le moteur
JavaScript V8 de Google Chrome pour qu'il puisse fonctionner en dehors du
navigateur.

Il est donc maitenant possible d'exécuter du JavaScript en dehors d'un
navigateur en utilisant Node.js. Pour ce faire, il suffit d'installer Node.js
sur votre machine et de créer un fichier `.js` contenant votre code JavaScript.

```javascript
// hello.js
console.log("Hello World !");
```

!!! tip "Astuce"
    Dans VSCode, l'extension Code Runner permet d'exécuter du code JavaScript
    directement dans l'éditeur sans avoir à ouvrir un terminal.

### Différences entre JavaScript dans un navigateur et Node.js

Les objets globaux et les fonctions disponibles dans un navigateur ne sont pas
les mêmes que ceux disponibles dans Node.js. Par exemple, `alert()` n'est pas
disponible dans Node.js, mais `console.log()` l'est. De plus, les objets globaux
`window` et `document` ne sont pas disponibles dans Node.js. En revanche,
Node.js offre des objets globaux comme `process` et `global`.

Donc, bien qu'il s'agisse du même langage, il y a des différences entre
JavaScript dans un navigateur et Node.js au niveau des objets globaux et des
fonctions disponibles.

## Les bases de JavaScript

### Variables

En JavaScript, on déclare une variable avec le mot-clé `var`, `let` ou `const`.
Il est recommandé d'utiliser `let` ou `const` plutôt que `var` pour déclarer des
variables.

```javascript
let x = 1;
const y = 2;
```

La différence entre `let` et `const` est que la valeur d'une variable déclarée
avec `const` ne peut pas être modifiée. Par exemple, le code suivant génère une
erreur :

```javascript
const z = 3;
z = 4; // Erreur : impossible de modifier une constante
```

Le mot-clé `var` est déprécié et ne devrait pas être utilisé. Il est préférable
d'utiliser `let` ou `const` pour déclarer des variables. En effet, `var` a des
comportements inattendus et peut causer des problèmes puisqu'il ne respecte pas
la portée lexicale. Par exemple, le code suivant ne génère pas d'erreur :

```javascript
if (true) {
  var a = 1;
}
// La variable a est encore accessible en dehors du bloc if
console.log(a); // 1
```

Alors que le code suivant génère une erreur :

```javascript
if (true) {
  let b = 2;
}
// La variable b n'est pas accessible en dehors du bloc if
console.log(b); // Erreur : b is not defined
```

#### Portée des variables

En JavaScript, il existe trois types de portée pour les variables : la portée
globale, la portée de fonction et la portée de bloc. Une variable déclarée à
l'extérieur d'une fonction est une variable globale, tandis qu'une variable
déclarée à l'intérieur d'une fonction est une variable locale. Une variable
déclarée à l'intérieur d'un bloc (par exemple, un `if` ou une boucle `for`) est
une variable locale au bloc.

```javascript
let x = 1; // variable globale

function test() {
  let y = 2; // variable locale
  for (let i = 0; i < 3; i++) {
    let z = 3; // variable locale au bloc
    console.log(i);
  }
  console.log(x); // 1
  console.log(y); // 2
  // Ici, console.log(z) serait une erreur
}

test();
console.log(x); // 1
console.log(y); // Erreur : y is not defined
```

### Types de données

JavaScript est un langage de programmation dynamiquement typé, ce qui signifie
que les variables n'ont pas de type fixe. Les types de données en JavaScript sont
les suivants :

- `number` : nombres entiers ou décimaux
- `string` : chaînes de caractères
- `boolean` : valeurs `true` ou `false`
- `null` : valeur nulle
- `undefined` : valeur non définie
- `object` : objets, tableaux, fonctions, etc.

```javascript
let a = 1; // number
let b = "Hello"; // string
let c = true; // boolean
let d = null; // null
let e; // undefined
let f = { x: 1, y: 2 }; // object
let g = [1, 2, 3]; // object (tableau)
let h = function() {}; // object (fonction)
```

### Opérateurs

Les opérateurs en JavaScript sont similaires à ceux des autres langages de
programmation. Voici quelques exemples d'opérateurs :

- Opérateurs arithmétiques : `+`, `-`, `*`, `/`, `%`
- Opérateurs de comparaison : `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
- Opérateurs logiques : `&&`, `||`, `!`

La différence entre `==` et `===` est que `==` compare les valeurs sans tenir
compte du type, tandis que `===` compare les valeurs en tenant compte du type.

```javascript
let a = 1;
let b = "1";

console.log(a == b); // true
console.log(a === b); // false
```

### Structures de contrôle

Les structures de contrôle en JavaScript sont similaires à celles des autres
langages de programmation. Voici quelques exemples de structures de contrôle :

- `if`, `else if`, `else` : pour exécuter du code conditionnel
- `switch`, `case`, `default` : pour exécuter du code en fonction de la valeur
  d'une variable
- `for`, `while`, `do while` : pour exécuter du code de manière répétée

```javascript
let x = 1;

if (x === 1) {
  console.log("x est égal à 1");
} else if (x === 2) {
  console.log("x est égal à 2");
} else {
  console.log("x n'est ni égal à 1 ni à 2");
}

switch (x) {
  case 1:
    console.log("x est égal à 1");
    break;
  case 2:
    console.log("x est égal à 2");
    break;
  case 3:
  case 4:
    console.log("x est égal à 3 ou 4");
    break;
  default:
    console.log("x n'est ni égal à 1 ni à 2");
}

for (let i = 0; i < 3; i++) {
  console.log(i);
}

let j = 0;
while (j < 3) {
  console.log(j);
  j++;
}

let k = 0;
do {
  console.log(k);
  k++;
} while (k < 3);
```

Dans le cas du `switch`, il est important d'utiliser le mot-clé `break` pour
sortir du `switch` une fois qu'un `case` a été exécuté. Sinon, tous les `case`
suivants seront exécutés.

Pour parcourir un objet, on peut utiliser une boucle `for...in` :

```javascript
let obj = { x: 1, y: 2, z: 3 };

for (let key in obj) {
  console.log(key + ": " + obj[key]);
}
```
L'ordre des clés n'est pas garanti, il est donc possible que les clés ne soient
pas affichées dans l'ordre dans lequel elles ont été définies.

Pour parcourir un tableau, on peut utiliser une boucle `for...of` :

```javascript
let arr = [1, 2, 3];

for (let value of arr) {
  console.log(value);
}
```

À noter que si vous `for...of` sur un objet, vous obtiendrez une erreur. Si vous
utilisez `for...in` sur un tableau, vous obtiendrez les index du tableau.


### Gestions des erreurs

En JavaScript, les erreurs peuvent être gérées à l'aide de blocs `try`, `catch`
et `finally`. Le bloc `try` permet d'essayer d'exécuter du code qui pourrait
générer une erreur. Si une erreur est générée, le bloc `catch` permet de la
capturer et de la gérer. Le bloc `finally` permet d'exécuter du code après le
bloc `try` et le bloc `catch`, qu'une erreur ait été générée ou non.

```javascript
try {
  // Code qui pourrait générer une erreur
  throw new Error("Une erreur s'est produite !");
} catch (err) {
  // Gestion de l'erreur
  console.error(err);
} finally {
  // Code à exécuter après le bloc try et le bloc catch
  console.log("Fin du bloc try-catch");
}
```