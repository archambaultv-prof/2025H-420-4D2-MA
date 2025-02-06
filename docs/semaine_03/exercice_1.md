# Exercice : Bibliothèque de gestion des finances personnelles

## Objectif

L’objectif de ce TP est de vous familiariser avec la création d’un package
Node.js, l’écriture de tests unitaires et la rédaction d’une documentation. Vous
allez développer une bibliothèque destinée à gérer des finances personnelles. Ce
projet vous permettra de consolider vos connaissances en JavaScript (ES modules,
async/await) et de développer votre autonomie.

## Informations générales

- Ce travail pratique est à réaliser individuellement.
- Ce travail vaut 10% de la note finale.
- La date de remise est le vendredi 14 février 2025 à 23h59.
- L'utilisation de l'IA est permise.

## Contexte

D'ici un an, vous serez en stage dans une entreprise de développement de
logiciels. Il est possible que vous utilisiez un autre langage que ceux que
vous avez appris jusqu'à présent. Si vous deviez écrire une bibliothèque dans ce 
langage, il vous faudrait trouver et lire la documentation par vous-même. Ce TP
est une occasion de vous entraîner à le faire avec un langage que vous connaissez
déjà.

Vous devez donc créer une bibliothèque en JavaScript (Node.js) pour gérer des
finances personnelles. Ce n'est pas tant la bibliothèque en elle-même qui est
importante, mais le processus de création d'une bibliothèque, de l'écriture des
tests unitaires à la rédaction de la documentation.

Les consignes sont volontairement ouvertes pour vous laisser une certaine
liberté, comme ça serait le cas dans un contexte professionnel. Vous devez donc
faire preuve de débrouillardise et d'autonomie pour mener à bien ce projet.

## Consignes

### 1. Créer un package Node.js

Vous devez faire une recherche sur comment créer un package Node.js.

- Initialisez votre projet avec `npm`.
- Votre package doit spécifier la ou les version Node.js compatibles. Le champs
  `engines` dans le `package.json` est un bon moyen de le faire. Vous devez
  utiliser une version LTS qui est encore supportée par
  [nodejs.org](https://nodejs.org/) OU la version disponible sur les machines de
  du Collège.
- Configurez votre projet pour utiliser les modules ES en ajoutant `"type": "module"` dans votre `package.json`.

### 2. Conception de la bibliothèque

Votre bibliothèque doit permettre de gérer des finances personnelles. Elle devra
inclure, au minimum, les classes suivantes :

#### a. Comptes (`Compte`)

- **Description** : Représente un compte bancaire ou un portefeuille.
- **Propriétés suggérées** :
  - `nom`  : le nom du compte.

#### b. Catégories (`Categorie`)

- **Description** : Permet de catégoriser les transactions (ex. : alimentation, transport, loisirs).
- **Propriétés suggérées** :
  - `nom`  : le nom de la catégorie.
  - `description`  : une description de la catégorie.
  
#### c. Transactions (`Transaction`)

Une transaction représente une opération financière. L'idée est que les
catégories permettent de classer les transactions qui représentes des dépenses
ou des revenus. Une dépense est une transaction qui diminue le solde d'un
compte, comme le paiement d'une facture ou un achat en ligne. Un revenu est une
transaction qui augmente le solde d'un compte, comme un salaire. Les transferts
ne sont pas catégorisables et représente un mouvement d'argent d'un compte à un
autre, comme le paiement d'une carte de crédit ou un virement entre deux
comptes. Ainsi, il existe trois types de transactions : transfert, dépenses et
revenus.


- **Propriétés suggérées** :
  - `montant`  : le montant de la transaction.
  - `compte`  : le compte associé à la transaction.	
  - `date`  : la date de la transaction.
  - `description`  : une description de la transaction. Peut être vide.
  - `type`  : transfert, dépenses ou revenus.
  - `categorie`  : la catégorie associée à la transaction s'il s'agit d'une
    dépense ou d'un revenu. Sinon, le compte s'il s'agit d'un transfert.


### 3. Opérations asynchrones

Vous devez fournir les fonctions **asynchrones** ci-dessous. Utilisez
`async/await` pour gérer ces opérations.

#### a. Création de comptes

Une fonction qui peut lire un fichier CSV contenant des informations sur les
comptes et les créer. Une ligne du fichier permet de créer un compte.

#### b. Création de transactions

Une fonction qui peut lire un fichier CSV contenant des informations sur les
transactions et les créer. Par exemple le fichier CSV pourrait contenir les
colonnes suivantes :
- `date`, `montant`, `description`, `type`, `categorie`.

#### c. Création de catégories

Une fonction qui peut lire un fichier CSV contenant des informations sur les
catégories et les créer. Une ligne du fichier permet de créer une catégorie.

#### d. Exportation sous format JSON

Pour chacune des trois classes, vous devez fournir une fonction qui permet
d'exporter les données sous format JSON dans un fichier dont le nom est passé
en paramètre.

#### e. Solde d'un compte

Une fonction qui permet de calculer le solde d'un compte à une date donnée.
Cette fonction accepte une liste de transactions, le nom du compte et une date.
Elle doit retourner le solde du compte à la date donnée. Cette fonction n'a pas
besoin d'être asynchrone.

#### f. Flux monétaire d'une catégorie

Une fonction qui permet de calculer le flux monétaire d'une catégorie entre deux
dates (inclusivement). Elle permet de répondre à la question : combien d'argent
ai-je dépensé en nourriture entre le 1er janvier et le 31 décembre 2024 ? 

Cette fonction accepte une liste de transactions, le nom de la catégorie, une
date de début et une date de fin. Elle doit retourner le montant total dépensé
dans la catégorie entre les deux dates (incluses). Cette fonction n'a pas besoin d'être
asynchrone.

### 4. Tests unitaires

- **Objectif** : Vérifier que vos classes et méthodes fonctionnent comme attendu.
- Utilisez le framework `Jest`
- Veillez à tester à la fois les cas normaux et les cas limites (ex. : fichier
  vide, liste vide, valeur manquante, listes de transactions non triées par date, etc.).

### 5. Documentation

- Utilisez JSDoc pour documenter votre code. Le professeur doit pouvoir générer
  la documentation selon les méthodes standards de JSDoc.
- Créez un fichier `README.md` qui présente votre projet, explique comment
    installer le package et fournit des exemples d’utilisation. **Vous pouvez
    utiliser le README.md pour attirer mon attention sur des points importants
    de votre code.**
- La documentation doit être claire et suffisante pour que quelqu’un puisse
  utiliser votre bibliothèque sans regarder le code source.

### 6. Packaging et publication locale

- Organisez votre projet de manière à ce qu’il puisse être publié comme un
  package Node.js.
- Assurez-vous qu’il puisse être installé localement (exemple : via `npm install <chemin_du_package>`).

### 7. Utilisation de Git

- Je vous suggère fortement d’utiliser Git pour versionner votre code. Vous ne
  serez pas évaluer sur l'utilisation de Git, mais c'est une bonne pratique à
  adopter.

## Livrables

- **Code source** : L’ensemble du code de votre bibliothèque, structuré en modules.
- **Tests unitaires** : Le répertoire contenant vos tests.
- **Documentation** : Un fichier `README.md` détaillé et la documentation
  générée ou pouvant être générée via JSDoc.

Vous devez remettre sur Omnivox votre package compressé à l'aide de la commande
`npm pack`. Assurez-vous que votre archive contient bien les tests unitaires
et la documentation. L'historique de Git n'est pas nécessaire.

Vous pouvez tester votre archive en l'installant localement dans un autre
répertoire avec la commande `npm init -y` suivie de `npm install
<chemin_du_package>`.

Si jamais vous avez des problèmes pour créer un package npm, vous pouvez
remettre un fichier ZIP contenant votre package. Toutefois, vous perdrez des
points sur le critère "Package npm".

## Grilles d’évaluation

La grille est sur 20 points. La note finale sera ramenée sur 10 points.

| Critère | Excellent (20 à 18) | Très bien (17 à 16) | Bien (15 à 14) | Passable (13 à 12) | Insuffisant (11 et moins) |
|---------|---------------------|---------------------|----------------|--------------------|--------------------------|
Fonctionnalité (20%) | Toutes les fonctionnalités demandées sont implémentées et fonctionnent correctement. | La plupart des fonctionnalités demandées sont implémentées et fonctionnent correctement. | Certaines fonctionnalités demandées sont implémentées et fonctionnent correctement. | Certaines fonctionnalités demandées sont implémentées mais ne fonctionnent pas correctement. | Peu de fonctionnalités demandées sont implémentées et ne fonctionnent pas correctement. |
Qualité du code (25%) | Le code est bien structuré, modulaire et facile à lire. | Le code est bien structuré et modulaire. | Le code est structuré mais manque de modularité. | Le code est mal structuré et difficile à lire. | Le code est mal structuré et difficile à lire. |
Tests unitaires (20%) | Toutes les classes et méthodes sont testées et les tests passent. Les cas limites sont testés. | La plupart des classes et méthodes sont testées et les tests passent. | Certaines classes et méthodes sont testées et les tests passent. | Certaines classes et méthodes sont testées mais les tests ne passent pas. | Peu de classes et méthodes sont testées et les tests ne passent pas. |
Documentation (25%) | La documentation est complète, claire, concise et bien rédigée. | La documentation est complète et claire. Certains points pourraient être améliorés. | La documentation est complète mais manque de clarté. | La documentation est incomplète et manque de clarté. | La documentation est absente ou inexistante. |
Package npm (10%) | Le package s'installe correctement et peut être utilisé sans problème. |  | Le package ne s'installe pas correctement. Une erreur mineure corrigée par le professeur. | | Le package ne s'installe pas correctement. Une erreur majeure difficile à corriger. |

## Conseils et recommandations

- **Planification** : Prenez quelques minutes pour planifier l’architecture de
  votre projet avant de commencer à coder.
- **Modularité** : Organisez votre code en modules pour faciliter la maintenance
  et la compréhension.
- **Tests** : N’attendez pas la fin du développement pour écrire vos tests,
  faites-le au fur et à mesure.
- **Documentation** : Investissez du temps dans la rédaction d’une bonne
  documentation, cela facilitera l’utilisation de votre bibliothèque.
- **Collaboration** : Travaillez de manière autonome, mais n’hésitez pas à
  échanger avec vos camarades pour résoudre des problèmes.

## Ressources utiles

- [Documentation Node.js](https://nodejs.org/fr/docs/)
- [Jest](https://jestjs.io/)
- [JSDoc](https://jsdoc.app/)

---

Bonne chance et bon travail !
