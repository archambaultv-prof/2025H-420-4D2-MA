# Micro-services

## Introduction

Les micro-services sont une architecture logicielle qui consiste à découper une
application en plusieurs services indépendants. Chaque service est responsable
d'une tâche spécifique et communique avec les autres services via des API.

C'est une logique similaire à celle des modules en programmation, mais à une
échelle plus grande. Chaque service peut être développé, déployé et mis à jour
indépendamment des autres services.

Les micro-services sont une alternative à l'architecture monolithique, où toute
l'application est regroupée dans un seul service. La plupart des applications
modernes, comme Netflix, Amazon, etc., utilisent une architecture basée sur les
micro-services, car elle présente de nombreux avantages.

## Avantages

- **Extensibilité** : Chaque service peut être déployé et mis à l’échelle
  indépendamment en fonction de ses besoins spécifiques (scalable en anglais).
- **Flexibilité technologique** : Chaque service peut être développé dans un
  langage ou avec des technologies différentes, permettant d’adapter l’outil au
  problème.
- **Résilience** : Un problème dans un microservice n’affecte pas
  nécessairement l’ensemble du système, facilitant la tolérance aux pannes.
- **Déploiement continu** : Il est possible de mettre à jour ou de déployer un
  microservice sans interrompre l’ensemble de l’application.

## Inconvénients

- **Complexité de gestion** : La communication entre microservices (souvent
  basée sur des API) ajoute de la complexité, notamment en termes de gestion
  des erreurs et de latence réseau.
- **Infrastructure** : Une architecture distribuée nécessite souvent une
  infrastructure et des outils (orchestrateurs, gestion de logs, monitoring)
  plus sophistiqués.
- **Débogage et test** : Tester et déboguer des interactions entre services
  peut être plus complexe qu’avec une application monolithique.
- **Performance** : Les appels réseau entre services peuvent être plus lents
  qu’un appel de fonction en mémoire. Ce point est toutefois nuancé par le
  fait que plusieurs applications ne pourrait pas fonctionner sur une seule
  machine de toute façon.

## Comment concevoir des micro-services

Pour concevoir des micro-services, il est important de bien découper
l'application en services indépendants. Chaque service doit avoir une
responsabilité unique et ne pas dépendre des autres services.

Pour une même application, il peut y avoir plusieurs façons de découper les
services. Une approche courante le Domain-Driven Design (DDD), qui consiste à
découper l'application en domaines métiers. Chaque domaine métier est ensuite
implémenté dans un service indépendant. Par exemple, pour une application comme
Netflix, on pourrait avoir des services pour la gestion des utilisateurs, la
gestion des vidéos, la gestion de la facturation, etc.
