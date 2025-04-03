# Exercice 3 : API REST pour un système de billets (tickets)

## Objectif

Pour ce TP, vous êtes chargé de développer une API pour une application de support
qui permet aux utilisateurs de soumettre des demandes d'assistance (tickets) et
de suivre leur statut. L'application permet également aux agents de support de
gérer les tickets et de communiquer avec les utilisateurs.

Une partie importante de ce TP est de vous familiariser avec la bibliothèque
[express-validator](https://express-validator.github.io/docs/) pour valider les
données d'entrée de l'API. Vous devez lire la documentation de cette
bibliothèque et l'utiliser pour valider les données d'entrée de votre API.

Je reste disponible pour répondre à vos questions sur l'utilisation de cette
bibliothèque.

## Informations générales

- Ce travail pratique est à réaliser individuellement.
- Ce travail vaut 10% de la note finale.
- La date de remise est le dimanche 13 avril 2025 à 23h59.
- L'utilisation de l'IA est permise.

## Consignes

### 1. Créer un dépôt Git

Créez un dépôt Git pour votre projet. Vous pouvez le faire sur GitHub ou sur
GitLab. Assurez-vous de le rendre public afin que je puisse y accéder.

Votre travail doit être sur la branche `main` de votre dépôt. Je vais corriger
le dernier commit de cette branche avant la date et l'heure limite de remise. 

Vous pouvez également créer d'autres branches comme `dev` pour le développement, mais je ne
vais pas corriger ces branches.

### 2. Créer un projet Node.js avec Express

Assurez-vous que votre projet est un projet Node.js valide. Il devrait
inclure un fichier `package.json` valide. Vous pouvez vous inspirer du
[dépôt d'exemple sur les authentifications](https://github.com/archambaultv-prof/2025H-420-4D2-MA-Authentification).

### 3. Configurer la base de données

Votre code doit être capable de créer la base de données SQLite3 lorsque
l'application démarre si elle n'existe pas déjà. Vous pouvez utiliser Knex.

Votre base de données doit contenir les tables suivantes :

- `users` : pour stocker les informations des utilisateurs.
- `tickets` : pour stocker les informations des tickets.

Vous devez déterminer vous-mêmes les colonnes nécessaires pour chaque table en fonction
des besoins de l'application.

### 4. Utilisateurs, techniciens et administrateurs

L'application doit gérer trois types d'utilisateurs :

- **Utilisateur** : Peut soumettre des tickets et voir l'historique de ses tickets.
- **Technicien** : Peut voir tous les tickets et les mettre à jour.
- **Administrateur** : Peut créer des utilisateurs et des techniciens. Mais ce compte
  n'est *pas* utilisé pour créer ou mettre à jour des tickets. Les routes qui gèrent
  les tickets (`/api/tickets`) ne doivent pas être accessibles par un administrateur, c'est-à-dire
  qu'elle retourne un message d'erreur si l'utilisateur est un administrateur.

### 5. Développement des routes

Développez les routes suivantes pour l'API :

- `POST /api/auth/admin` : Logging d'un administrateur. Vous pouvez créer un administrateur
  avec un mot de passe par défaut dans la base de données.
- `POST /api/auth/new` : Inscription d'un nouvel utilisateur ou d'un nouveau technicien. Seul un
  administrateur peut créer un nouvel utilisateur ou technicien.
- `POST /api/auth/login` : Authentification d'un utilisateur ou technicien. Notez que l'administrateur
  ne se connecte pas avec cette route.
- `POST /api/tickets` : Créer un nouveau ticket par un utilisateur ou un
  technicien.
- `GET /api/tickets` : Obtenir la liste de tous les tickets. Seul un technicien 
  peut voir tous les tickets. Un utilisateur ne peut voir que ses propres tickets.
- `GET /api/tickets/:id` : Obtenir les détails d'un ticket.
- `PUT /api/tickets/:id` : Mettre à jour un ticket. Seul un technicien peut
  mettre à jour un ticket. Notez que fermer un ticket est une mise à jour de son statut.

- `DELETE /api/admin/tickets/:id` : Supprimer un ticket. Seul un administrateur
  peut supprimer un ticket.

## 6. Sécuriser l'API

Vous devez sécuriser l'API avec JWT (JSON Web Token). Cela signifie que
lorsqu'un utilisateur, administrateur ou un technicien se connecte, il doit
recevoir un token JWT qui doit être utilisé en fonction de la route.

Vous devez sécuriser les mots de passe dans la base de données. Vous pouvez utiliser
bcrypt pour cela.

## 7. Valider les données d'entrée

Utilisez `express-validator` pour valider les données d'entrée de l'API. Notamment, un billet
valide doit contenir les champs suivants :

- `title` : Le titre du ticket (doit être une chaîne de caractères non vide).
- `description` : La description du ticket (doit être une chaîne de caractères non vide).
- `status` : Le statut du ticket doit être l'un des suivants : `open`, `in progress`, `closed`.
- `userId` : L'ID de l'utilisateur qui a créé le ticket (doit être un entier positif) qui
  correspond à un utilisateur existant dans la base de données.
- `technicianId` : L'ID du technicien qui gère le ticket (doit être un entier positif) qui
  correspond à un technicien existant dans la base de données ou `null` si le ticket
  n'est pas encore assigné à un technicien.
- `createdAt` : La date de création du ticket (doit être une date valide).
- `closedAt` : La date de fermeture du ticket (doit être une date valide ou `null` si le
  ticket n'est pas encore fermé). Si le ticket est fermé, la date de fermeture
  doit être supérieure à la date de création. Le statut du ticket doit être
  `closed` si la date de fermeture est renseignée.

Toutes ces validations doivent être effectuées à l'aide de `express-validator`.
Ceci est important, vous perdez des points si vous le faites sans
`express-validator`.

## 8. Requêtes HTTP de test

Vous devez créer un fichier `request.http` dans lequel vous allez
tester toutes les routes de l'API. Vous pouvez utiliser le plugin
[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
pour Visual Studio Code. Ce fichier doit être dans votre dépôt Git.

## Livrables

- **Code source** : Votre code source doit être bien structuré et organisé.
- **README** : Un fichier `README.md`
- **Commentaires** : Votre code doit être commenté de manière appropriée.

## Critères d’évaluation

- **Fonctionnalité (25%)** : L'API doit fonctionner comme prévu.
- **Validation (40%)** : Utilisation d'Express Validator pour valider les données
  d'entrée et conditionner les routes.
- **Sécurité (25%)** : Sécuriser l'API avec JWT.
- **Qualité du code (10%)** : Le code doit être bien structuré et commenté.


---

Bonne chance et bon travail !
