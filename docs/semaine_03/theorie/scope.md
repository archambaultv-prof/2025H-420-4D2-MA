# Espace de noms

L'espace de noms en JavaScript est un concept qui permet de regrouper des
variables et des fonctions sous un même objet afin d'éviter les collisions entre
identifiants, surtout dans un environnement global.

Exemple : Utilisation d'un objet comme espace de noms

```javascript
// Création d'un espace de noms "MonApp"
var MonApp = {};

// Ajout de variables et fonctions dans cet espace
MonApp.version = "1.0";

MonApp.afficherVersion = function() {
  console.log("Version de l'application :", MonApp.version);
};

MonApp.afficherVersion(); // Affiche : Version de l'application : 1.0

console.log(version); // Affiche : undefined
```

Dans Node.js, chaque fichier est considéré comme un module avec sa propre
portée. Ainsi, les variables et fonctions définies dans un fichier ne sont pas
accessibles globalement, ce qui permet d'éviter naturellement les conflits de
noms.