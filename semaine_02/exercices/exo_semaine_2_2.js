
/*
  EXERCICE 1 - Promesses (Introduction)
  Rappel: Une promesse représente l'aboutissement (réussi ou en échec) d'une opération asynchrone.
  Tâche:
  - Créez une fonction "delayedMessage" qui retourne une promesse.
  - La promesse doit se résoudre après 1 seconde, et retourner le message "Opération terminée!".
*/

/*
  EXERCICE 2 - Chaînage de Promesses
  Rappel: then() permet de chaîner plusieurs actions successives.
  Tâche:
  - Créez une fonction "getData" qui résout une promesse avec une valeur (par ex: "Données 1").
  - Enchaînez ensuite deux autres promesses avec then() pour retourner "Données 2" et "Données 3".
  - Affichez le résultat final dans la console.
*/

/*
  EXERCICE 3 - async/await (Introduction)
  Rappel: async/await simplifie la syntaxe des promesses en rendant le code plus linéaire.
  Tâche:
  - Reprenez "delayedMessage" de l'EXERCICE 1.
  - Créez une fonction async "showMessage" qui appelle delayedMessage() avec await.
  - Affichez la valeur résolue par "delayedMessage()".
*/

/*
  EXERCICE 4 - async/await (Gestion d'erreur)
  Rappel: Vous pouvez gérer les erreurs avec try/catch dans une fonction async.
  Tâche:
  - Créez une fonction "errorProne" qui rejette la promesse. 
  - Dans une fonction async, appelez "errorProne" avec await et gérez l'erreur avec try/catch.
*/

/*
  EXERCICE 5 - Utiliser Promise.all
  Rappel: Promise.all([...]) permet de lancer plusieurs promesses en parallèle et attendre qu'elles soient toutes résolues.
  Tâche:
  - Créez trois fonctions qui retournent chacune une promesse se résolvant après un temps différent.
  - Utilisez Promise.all pour exécuter ces promesses simultanément, puis affichez le résultat global.
*/
