# Fonctions

Les fonctions en JavaScript sont des objets de première classe, ce qui signifie
qu'elles peuvent être assignées à des variables, passées en paramètre et
retournées par d'autres fonctions. Voici comment déclarer une fonction en
JavaScript :

```javascript
function add(a, b) {
  return a + b;
}

let result = add(1, 2);
console.log(result); // 3
```

Il est également possible de déclarer une fonction et de l'assigner à
une variable :

```javascript
let multiply = function(a, b) {
  return a * b;
};

let result = multiply(2, 3);
console.log(result); // 6
```

Vous pouvez ainsi définir une fonction à l'intérieur d'une autre fonction :

```javascript
function outerFunction() {
  function innerFunction() {
    console.log('Hello from inner function!');
  }

  innerFunction();
}

outerFunction(); // Affiche 'Hello from inner function!'
```

## Paramètres de fonction

Les fonctions en JavaScript peuvent prendre un nombre variable de paramètres. Si
vous appelez une fonction avec moins de paramètres que prévu, les paramètres
manquants seront `undefined`. Si vous appelez une fonction avec plus de
paramètres que prévu, les paramètres supplémentaires seront ignorés.

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(1)); // NaN
console.log(add(1, 2)); // 3
console.log(add(1, 2, 3)); // 3
```

Il est possible de définir des valeurs par défaut pour les paramètres d'une
fonction :

```javascript
function greet(name = 'World') {
  console.log(`Hello, ${name}!`);
}

greet(); // Affiche 'Hello, World!'
greet('Alice'); // Affiche 'Hello, Alice!'
```

Lorsqu'un objet est passé en paramètre à une fonction, il est passé par
référence, ce qui signifie que si vous modifiez l'objet à l'intérieur de la
fonction, les modifications seront visibles à l'extérieur de la fonction. Il en va
de même pour les tableaux.

```javascript
function increment(obj) {
  obj.value++;
}

let counter = { value: 0 };
increment(counter);
console.log(counter.value); // 1
```

```javascript
let numbers = [1, 2, 3];

function addNumber(array, number) {
  array.push(number);
}

addNumber(numbers, 4);
console.log(numbers); // [1, 2, 3, 4]
```

### Nombre variable de paramètres

Il est possible de définir une fonction avec un nombre variable de paramètres en
utilisant l'opérateur de propagation (`spread operator`). Voici un exemple :

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, val) => acc + val, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

```javascript
function greet(...names) {
  names.forEach(name => console.log(`Hello, ${name}!`));
}

greet('Alice', 'Bob', 'Charlie');
// Affiche 'Hello, Alice!', 'Hello, Bob!', 'Hello, Charlie!'
```

L'opérateur de propagation (`spread operator`) peut être utilisé après avoir
défini des paramètres fixes :

```javascript
function greet(greeting, ...names) {
  names.forEach(name => console.log(`${greeting}, ${name}!`));
}

greet('Hi', 'Alice', 'Bob', 'Charlie');
// Affiche 'Hi, Alice!', 'Hi, Bob!', 'Hi, Charlie!'
```

L'opérateur de propagation (`spread operator`) permet aussi de passer un tableau ou un
objet comme une liste d'arguments à une fonction. Voici comment l'utiliser :

```javascript
function add(a, b, c) {
  return a + b + c;
}

let numbers = [1, 2, 3];
let result = add(...numbers);
console.log(result); // 6
```

```javascript
function greet(firstname, lastname) {
  console.log(`Hello, ${firstname} ${lastname}!`);
}

let person = { firstname: 'Alice', lastname: 'Smith' };
greet(...person); // Affiche 'Hello, Alice Smith!'
```

## Valeur de retour

Les fonctions en JavaScript peuvent retourner une valeur à l'aide du mot-clé
`return`. Si une fonction ne retourne pas de valeur, elle retourne `undefined`.

## Fonctions fléchées

Les fonctions fléchées (`arrow functions`) sont une syntaxe plus concise pour
définir des fonctions en JavaScript. Elles sont souvent utilisées pour les
fonctions anonymes et les fonctions de rappel (`callback functions`). Voici
comment définir une fonction fléchée :

```javascript
let add = (a, b) => a + b;

let result = add(1, 2);
console.log(result); // 3
```
