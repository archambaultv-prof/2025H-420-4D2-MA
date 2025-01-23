# Qu'est-ce qu'une donnée ?

Le titre du cours est "services d'échange de données". Mais qu'est-ce qu'une
donnée? En informatique, on pourrait tenter de la définir comme une suite de 0
et de 1. Lorsque la suite de 0 et de 1 est entreposées sur un support physique,
on appelle en général une telle suite un fichier. Mais il faut bien comprendre
que cette suite n'a aucun sens en soi. Si on vous remet un fichier qui
contient la suite de 0 et de 1 suivante :
```text
01001000 01100101 01101100 01101100 01101111 00101100 00100000 01110111 01101111 01110010 01101100 01100100
```
que faites-vous avec? Vous ne pouvez rien en faire, car vous ne savez pas
comment interpréter ces octets (séquence de huit bits). Il faut une
convention, un format, pour décrire comment interpréter cette séquence d'octets.
Par exemple, si on vous dit que c'est un fichier texte UTF-8, vous pourrez lire
`Hello, world`.

De façon générale, le format du fichier est indiqué par son extension. Par
exemple, un fichier `.docx` est un fichier Word, un fichier `.pdf` est un
fichier PDF dont le nom est l'acronyme de _Portable Document Format_, etc.

## Formats binaires et formats textes

Il existe deux grandes familles de formats de données : les formats binaires et
les formats textes. Les formats binaires sont des séquences d'octets qui ne
sont pas directement lisibles par un humain. Par exemple, un
fichier `.docx` est un fichier binaire, alors qu'un fichier `.txt` est un
fichier texte.

L'encodage d'un fichier binaire est souvent spécifique à une application. En
revanche, les fichiers textes sont souvent encodés selon des standards reconnus.
Par exemple, de nos jours les fichiers textes sont souvent encodés en UTF-8, qui
est un standard de l'Unicode Consortium.

### Avantages et inconvénients des formats binaires et textes

[Exercice](../exercices/binaire_texte.md) :
En équipe de 4 à 5 personnes, discutez des avantages et inconvénients des
formats binaires et textes.

<!-- Le tableau suivant résume les avantages et inconvénients des formats binaires et
textes :

| Format          | Avantages                                                                 | Inconvénients                                                      |
|-----------------|---------------------------------------------------------------------------|--------------------------------------------------------------------|
| Binaire         | - Plus compact, économise de l'espace de stockage<br>- Plus rapide à lire et à écrire par les machines<br>- Peut contenir des données plus complexes | - Non lisible par l'humain<br>- Dépendant de l'application qui l'a créé<br>- Difficile à déboguer et à modifier manuellement |
| Texte           | - Lisible par l'humain<br>- Facile à modifier et à déboguer<br>- Indépendant de l'application, souvent basé sur des standards reconnus | - Peut être plus volumineux<br>- Moins efficace en termes de vitesse de lecture/écriture par les machines<br>- Peut nécessiter un encodage spécifique (comme UTF-8) |
 -->
