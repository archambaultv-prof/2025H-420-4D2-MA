# Exercice 2 : Module de gestion des finances personnelles

## Objectif

Vous allez développer un micro-service pour gérer des finances personnelles. Ce
micro-service se concentre uniquement sur la gestion des transactions. Vous
allez donc créer un service REST qui permet de créer, lire, mettre à jour et
supprimer des transactions.

Puisque la gestion des utilisateurs n'a pas encore été abordée, vous n'avez pas
besoin de gérer l'authentification.

## Informations générales

- Ce travail pratique est à réaliser individuellement.
- Ce travail vaut 15% de la note finale.
- La date de remise est le jeudi 6 mars 2025 à 23h59.
- Remettre votre code source sur Omnivox.
- L'utilisation de l'IA est permise.

## Consignes

### Créer un package Node.js

Comme pour le TP précédent, vous devez créer un package Node.js pour votre module.

- Initialisez votre projet avec `npm`.
- Votre package doit spécifier la ou les version Node.js compatibles. Le champs
  `engines` dans le `package.json` est un bon moyen de le faire. Vous devez
  utiliser une version LTS qui est encore supportée par
  [nodejs.org](https://nodejs.org/) OU la version disponible sur les machines de
  du Collège.
- Vous pouvez choisir d'utiliser les modules `CommonJS` ou les modules `ES6`.
- Vous devez utiliser `express` pour créer votre service REST.

### Créer une base de données SQLite3

Vous devez utiliser une base de données SQLite3 pour stocker les comptes et les
transactions. Vous pouvez utiliser `knex` pour gérer la base de données. Votre
micro-service se concentre sur la gestions des transactions, ainsi il n'est pas
nécessaire que votre module soit capable de créer à la volée la base de données
et les tables. Vous pouvez le faire manuellement une fois pour toutes.

### Conception de la bibliothèque

Ce micro-service doit permettre de gérer des transactions financières. Il doit
offrir les fonctionnalités suivantes :

#### Route pour remise à plat de la base de données

Cette route permet de supprimer toutes les données de la base de données. Elle
est utile pour réinitialiser la base de données. Vous n'avez pas besoin de
supprimer les tables, seulement les données.

- Méthode : `DELETE`
- Route : `/reset`

#### Route pour création de compte

Cette route permet de créer un compte.

- Méthode : `POST`
- Route : `/comptes`
- Paramètres : `nom` (string)

Le nom du compte doit être unique. Si un compte avec le même nom existe déjà,
vous devez retourner un code d'erreur approprié.

#### Route pour récupération des comptes

Cette route permet de récupérer la liste des comptes sous forme de tableau
JSON.

- Méthode : `GET`
- Route : `/comptes`

#### Route pour création de transaction

Cette route permet de créer une transaction.

- Méthode : `POST`
- Route : `/transactions`
- Paramètres : `montant` (number), `from_account` (string), `to_account` (string),
`date` (string), `comment` (string)

L'identifiant de la transaction doit être généré automatiquement.

Vous devez gérer les erreurs suivantes :

- La date doit être au format `YYYY-MM-DD`. Si ce n'est pas le cas, vous devez
  retourner un code d'erreur approprié.
- Les comptes `from_account` et `to_account` doivent exister. Si ce n'est pas le
  cas, vous devez retourner un code d'erreur approprié.
- Le montant doit toujours être strictement positif, si ce n'est pas le cas, vous
  devez retourner un code d'erreur approprié.

#### Route pour récupération des transactions

Cette route permet de récupérer la liste des transactions sous forme de tableau
JSON. Pour rappel

- Méthode : `GET`
- Route : `/transactions`

#### Route de mise à jour d'une transaction

Cette route permet de mettre à jour une transaction. Le corps de la requête doit
contenir les informations nécessaires sous format JSON.

- Méthode : `PUT`
- Route : `/transactions/:id`
- Paramètres : `montant` (number), `from_account` (string), `to_account` (string),
`date` (string), `comment` (string)

#### Route pour récupération des transactions d'un compte

Cette route permet de récupérer la liste des transactions d'un compte sous forme
de tableau JSON. Une transaction est associée à un compte si le compte est soit
le compte source (`from_account`) ou le compte destination (`to_account`).

- Méthode : `GET`
- Route : `/transactions/:compte`

#### Route pour récupération d'un solde

Cette route permet de récupérer le solde d'un compte à une date donnée. Le solde
d'un compte est la somme des montants des transactions associées au compte jusqu'à
la date donnée. La date est transmise en paramètre dans l'URL.

- Méthode : `GET`
- Route : `/comptes/:compte/solde`

```javascript
// Example : /comptes/abc/solde?date=YYYY-MM-DD
app.get('/comptes/:compte/solde', (req, res) => {
  const { compte } = req.params;    // "abc"
  const { date } = req.query;       // "2025-02-27"
```

### Requêtes HTTP pour tester votre micro-service

Fournissez des exemples de requêtes HTTP pour tester votre micro-service.
Vous devez mettre vos requêtes dans un fichier `requests.http` à la racine de
votre projet. Vous pouvez utiliser l'extension REST Client de Visual Studio Code
pour exécuter les requêtes.

Pensez à tester les cas limites et les erreurs.

### Documentation

- Vous devez documenter votre code avec des commentaires clairs et concis.
- Créez un fichier `README.md` qui présente brièvement votre projet. *Vous
    pouvez utiliser le README.md pour attirer mon attention sur des points
    importants de votre code.*

### Utilisation de Git

- Je vous suggère fortement d’utiliser Git pour versionner votre code. Vous ne
  serez pas évaluer sur l'utilisation de Git, mais c'est une bonne pratique à
  adopter.

## Livrables

Remettez votre travail sur Omnivox. Votre remise doit contenir un seul dossier.
Il doit contenir notamment les éléments suivants :

- **README.md** : Présentation de votre projet.
- **requests.http** : Fichier contenant les requêtes HTTP pour tester votre
  micro-service.
- **Code source** : L’ensemble du code.
- **Base de données SQLite3** : La base de données SQLite3.

## Grilles d’évaluation

La grille est sur 20 points. La note finale sera ramenée sur 15 points.

| Critère | Excellent (20 à 18) | Très bien (17 à 16) | Bien (15 à 14) | Passable (13 à 12) | Insuffisant (11 et moins) |
|---------|---------------------|---------------------|----------------|--------------------|--------------------------|
|Fonctionnalité (35%) | Toutes les fonctionnalités demandées sont implémentées et fonctionnent correctement. | La plupart des fonctionnalités demandées sont implémentées et fonctionnent correctement. | Certaines fonctionnalités demandées sont implémentées et fonctionnent correctement. | Certaines fonctionnalités demandées sont implémentées mais ne fonctionnent pas correctement. | Peu de fonctionnalités demandées sont implémentées et ne fonctionnent pas correctement. |
|Qualité du code (35%) | Le code est bien structuré, modulaire et facile à lire. | Le code est bien structuré et modulaire. | Le code est structuré mais manque de modularité. | Le code est mal structuré et difficile à lire. | Le code est mal structuré et difficile à lire. |
|Requêtes http (15%) | Toutes les routes sont testées. Les cas limites sont testés. | La plupart des routes sont testées. | Certaines routes sont testées. | Peu de routes sont testées. | Peu de routes sont mal testées. |
|Documentation (15%) | La documentation est complète, claire, concise et bien rédigée. | La documentation est complète et claire. Certains points pourraient être améliorés. | La documentation est complète mais manque de clarté. | La documentation est incomplète et manque de clarté. | La documentation est absente ou inexistante. |

---

Bon travail !
