function attendreUneSeconde(callback) {
  setTimeout(() => {
    callback();
  }, 1000);
}

attendreUneSeconde(() => {
  console.log("Callback appelé après 1 seconde !");
});

// Mettre attendreUneSeconde sous forme de promesse
function attendreUneSecondePromise() {
  return null; // TODO
}

// Écrire une autre fonction qui simule une promesse qui se résout après 2 secondes
function attendreDeuxSecondesPromise() {
  return null; // TODO
}

// Utiliser les deux promesses avec Promise.all


// Utiliser les deux promesses avec .then

// Réécrire la fonction attendreUneSeconde avec async/await

// Utiliser les deux promesses avec async/await
