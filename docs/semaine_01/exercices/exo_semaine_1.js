const fs = require('fs');
// Vous devrez ajouter les imports nécessaires
// Une partie de ce travail consiste à trouver les bons modules Node.js

// Écrire une fonction pour lire des données d'un fichier CSV
// Elle doit utiliser un callback pour retourner un tableau d'objets
function readCsv(filename, callback) {
    // Complétez le code ici
}

// Écrire une fonction pour écrire des objets dans un fichier CSV
// Les objets ont la même structure. Utilisez un callback pour signaler la fin de l'écriture.
function writeCsv(filename, data, callback) {
    // Complétez le code ici
}

// Enregistrer les données sous format JSON
// Utilisez un callback pour signaler la fin de l'écriture.
function writeJson(filename, data, callback) {
    // Complétez le code ici
}

// Lire les données JSON
// Utilisez un callback pour retourner les données JSON
function readJson(filename, callback) {
    // Complétez le code ici
}

// Enregistrer les données sous format YAML
// Utilisez un callback pour signaler la fin de l'écriture.
function writeYaml(filename, data, callback) {
    // Complétez le code ici
}

// Lire les données YAML
// Utilisez un callback pour retourner les données YAML
function readYaml(filename, callback) {
    // Complétez le code ici
}

// Tests
// Vous n'avez pas besoin de modifier ce code
// Lorsque vous avez terminé, exécutez ce fichier avec Node.js
// Vous devriez voir s'afficher "Les données sont identiques. Bravo !" dans la console
function mkPromise(fn) {
    return (...args) =>
        new Promise((resolve, reject) => {
            fn(...args, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
}

const readPromise = mkPromise(readCsv);
const writePromise = mkPromise(writeCsv);
const writeJsonPromise = mkPromise(writeJson);
const readJsonPromise = mkPromise(readJson);
const writeYamlPromise = mkPromise(writeYaml);
const readYamlPromise = mkPromise(readYaml);

function check_data(data1, data2) {
    if (data1.length !== data2.length) {
        console.log('Les données sont de tailles différentes, corriger le code.');
        return;
    }
    for (let i = 0; i < data1.length; i++) {
        if (JSON.stringify(data1[i]) !== JSON.stringify(data2[i])) {
            console.log('Les données sont différentes, corriger le code.');
            return;
        }
    }
    console.log('Les données sont identiques. Bravo !');
}

(async function runTests() {
    try {
        // Lecture du fichier CSV
        const csvData = await readPromise('pays.csv');

        // Écriture dans un fichier CSV
        await writePromise('output.csv', csvData);

        // Lecture du fichier écrit
        const csvData2 = await readPromise('output.csv');
        check_data(csvData, csvData2);

        // Écriture et lecture JSON
        await writeJsonPromise('output.json', csvData);
        const jsonData = await readJsonPromise('output.json');
        check_data(csvData, jsonData);

        // Écriture et lecture YAML
        await writeYamlPromise('output.yaml', csvData);
        const yamlData = await readYamlPromise('output.yaml');
        check_data(csvData, yamlData);

    } catch (err) {
        console.error('Erreur lors des tests :', err);
    }
})();
