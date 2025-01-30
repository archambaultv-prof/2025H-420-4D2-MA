# Objets et tableaux

Les objets et les tableaux permettent de stocker des collections de données de
manière structurée.

## Objets

Les objets en JavaScript sont des collections de paires clé-valeur. Voici comment
déclarer un objet en JavaScript :

```javascript
let person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  isStudent: true
};

console.log(person.firstName); // John
console.log(person['lastName']); // Doe
```

Il est possible d'ajouter ou de modifier des propriétés d'un objet après sa
déclaration :

```javascript
person.city = 'Montreal';
person['country'] = 'Canada';

console.log(person.city); // Montreal
console.log(person['country']); // Canada
```

La syntaxe `person.firstName` est équivalente à `person['firstName']`. Noter
aussi que les clés des propriétés d'un objet sont des chaînes de caractères. Il
est possible d'utiliser des caractères spéciaux, des espaces et des chiffres
dans les clés :

```javascript
let person = {
  'first name': 'John',
  'last-name': 'Doe',
  'age': 30
};

console.log(person['first name']); // John
console.log(person['last-name']); // Doe
```

Les objets peuvent contenir d'autres objets ou des tableaux :

```javascript
let person = {
  name: {
    first: 'John',
    last: 'Doe'
  },
  age: 30,
  hobbies: ['reading', 'swimming']
};

console.log(person.name.first); // John
console.log(person.hobbies[0]); // reading
```

### Suppression de propriétés

Il est possible de supprimer une propriété d'un objet avec l'opérateur `delete` :

```javascript
let person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  isStudent: true
};

delete person.age;

console.log(person.age); // undefined
```

### Constructeurs et héritage

En JavaScript, la programmation orientée objet repose sur le concept de
prototypes. Toutefois, il existe depuis ECMAScript 2015 (ES6) une syntaxe
basée sur les classes, qui rend la manipulation des objets et de l’héritage
plus familière pour ceux qui connaissent d’autres langages orientés objet (Java,
C++, etc.).

#### Les fonctions constructrices et le prototype

Avant l’introduction des classes ES6, la création d’objets "comme des classes"
en JavaScript se faisait à l’aide de **fonctions constructrices**. L’idée est de
créer une fonction qu’on va appeler avec le mot-clé `new` pour instancier un
objet.

```js
function Person(nom, age) {
  // Dans une fonction constructrice, "this" fait référence à l’instance en cours de création
  this.nom = nom;
  this.age = age;

  // Il est possible de définir des méthodes directement ici...
  this.sePresenter = function() {
    console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
  };
}

// Instanciation d'un objet "Person"
const alice = new Person("Alice", 25);
alice.sePresenter(); 
// Affiche : "Bonjour, je m'appelle Alice et j'ai 25 ans."
```

Donc, dans l’exemple ci-dessus, `Person` est une fonction constructrice qui
permet de créer des objets `Person`. Lorsqu’on appelle `new Person("Alice", 25)`,
une nouvelle instance de `Person` est créée avec les propriétés `nom` et `age`
initialisées à "Alice" et 25, respectivement.

Sans le mot-clé `new`, `this` fait référence à l’objet global (`window` dans un
navigateur, `global` dans Node.js). C’est pourquoi il est important d’utiliser
`new` lors de l’instanciation d’un objet avec une fonction constructrice.

Aussi, pour éviter de dupliquer les méthodes pour chaque instance, il est
possible de les définir sur le prototype de la fonction constructrice :

```js
function Person(nom, age) {
  this.nom = nom;
  this.age = age;
}

Person.prototype.sePresenter = function() {
  console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
};

const alice = new Person("Alice", 25);
alice.sePresenter();
// Affiche : "Bonjour, je m'appelle Alice et j'ai 25 ans."
```

Dans cet exemple, la méthode `sePresenter` est définie sur `Person.prototype`. Cela
signifie que toute instance de Person héritera de cette méthode via la chaîne de
prototypes. On a ainsi une seule fonction en mémoire, partagée par tous les
objets créés.

#### Les classes ES6

Depuis ECMAScript 2015 (ES6), JavaScript supporte une syntaxe de classe plus
proche de ce qu’on retrouve dans d’autres langages orientés objet. Voici comment
on pourrait réécrire l’exemple précédent avec des classes :

```js
class Person {
  constructor(nom, age) {
    this.nom = nom;
    this.age = age;
  }

  sePresenter() {
    console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
  }
}

const alice = new Person("Alice", 25);
alice.sePresenter();
// Affiche : "Bonjour, je m'appelle Alice et j'ai 25 ans."
```

Le constructeur de la classe est défini avec le mot-clé `constructor`. Il est appelé
lorsqu’on instancie un nouvel objet avec `new`. Les méthodes de la classe sont
définies directement dans le corps de la classe, sans le mot-clé `function`. Elles
sont automatiquement ajoutées au prototype de la classe.

Les deux approches (fonctions constructrices et classes) sont équivalentes en
termes de fonctionnalités. C’est une question de préférence de style et de
lisibilité.

### Héritage

Cette section est une introduction à l’héritage en JavaScript avec la syntaxe
des classes ES6. Pour une discussion plus approfondie sur les prototypes et
l’héritage en JavaScript, voir [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

En JavaScript, l’héritage est basé sur les prototypes. Une classe peut hériter
des propriétés et méthodes d’une autre classe en utilisant le mot-clé `extends`.

```js
class Person {
  constructor(nom, age) {
    this.nom = nom;
    this.age = age;
  }

  sePresenter() {
    console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
  }
}

class Etudiant extends Person {
  constructor(nom, age, programme) {
    super(nom, age); // Appel du constructeur de la classe parent
    this.programme = programme;
  }

  etudier() {
    console.log(`${this.nom} étudie ${this.programme}.`);
  }
}

const bob = new Etudiant("Bob", 20, "Informatique");
bob.sePresenter();
bob.etudier();
// Affiche :
// "Bonjour, je m'appelle Bob et j'ai 20 ans."
// "Bob étudie Informatique."
```

Dans cet exemple, `Etudiant` hérite de `Person` en utilisant `extends`. Le
constructeur de `Etudiant` appelle `super(nom, age)` pour appeler le constructeur
de la classe parent `Person`. Les méthodes `sePresenter` et `etudier` sont
disponibles pour les instances de `Etudiant`.

Il est possible de surcharger des méthodes héritées en redéfinissant la méthode
dans la classe enfant. Par exemple, si `Etudiant` redéfinit `sePresenter`, la
méthode de `Person` ne sera pas appelée pour les instances de `Etudiant`.

## Tableaux

Les tableaux en JavaScript sont des collections ordonnées d'éléments. Voici
comment déclarer un tableau en JavaScript :

```javascript
let numbers = [1, 2, 3, 4, 5];

console.log(numbers[0]); // 1
console.log(numbers[2]); // 3
```

Il est possible d'ajouter ou de modifier des éléments d'un tableau après sa
déclaration :

```javascript
numbers.push(6);
numbers[1] = 10;

console.log(numbers); // [1, 10, 3, 4, 5, 6]
```

### Parcourir un tableau

Il est possible de parcourir un tableau avec une boucle `for` :

```javascript
let numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

Il est aussi possible d'utiliser la méthode `forEach` :

```javascript
numbers.forEach(function(number) {
  console.log(number);
});
```

### La méthode `splice`

La méthode `splice` permet de modifier le contenu d'un tableau en ajoutant ou en
supprimant des éléments. La méthode `splice` prend plusieurs arguments : l'index de
départ, le nombre d'éléments à supprimer et les éléments à ajouter.

Par exemple, pour ajouter un élément à un tableau :

```javascript
let numbers = [1, 2, 3, 4, 5];

numbers.splice(2, 0, 6); // Ajoute l'élément 6 à l'index 2

console.log(numbers); // [1, 2, 6, 3, 4, 5]
```


Pour supprimer un élément d'un tableau :

```javascript
let numbers = [1, 2, 3, 4, 5];

numbers.splice(2, 1); // Supprime l'élément à l'index 2

console.log(numbers); // [1, 2, 4, 5]
```

Il est possible de supprimer et d'ajouter des éléments en même temps :

```javascript
let numbers = [1, 2, 3, 4, 5];

// Supprime l'élément à l'index 2 et ajoute deux éléments
numbers.splice(2, 1, 6, 7);

console.log(numbers); // [1, 2, 6, 7, 4, 5]
```

### Copie de tableaux

Il est important de noter que l'affectation d'un tableau à une autre variable ne
copie pas le tableau, mais crée une référence au même tableau. Pour copier un
tableau, il est possible d'utiliser la méthode `slice` :

```javascript
let numbers = [1, 2, 3, 4, 5];
let copy = numbers.slice();

copy.push(6);

console.log(numbers); // [1, 2, 3, 4, 5]
console.log(copy); // [1, 2, 3, 4, 5, 6]
```

La méthode `slice` sans arguments crée une copie du tableau original. Si on
fournit des arguments à `slice`, on obtient une sous-section du tableau original.

```javascript
let numbers = [1, 2, 3, 4, 5];

let subArray = numbers.slice(1, 3);

console.log(subArray); // [2, 3]
```

### Opérateurs de décomposition

L'opérateur de décomposition (`spread operator`) permet de décomposer un tableau
en éléments individuels. Cela peut être utile pour passer les éléments d'un
tableau comme arguments à une fonction :

```javascript
let numbers = [1, 2, 3];

function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(...numbers)); // 6
```

Il est aussi possible de concaténer des tableaux avec l'opérateur de décomposition :

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let combined = [...arr1, ...arr2];

console.log(combined); // [1, 2, 3, 4, 5, 6]
```
