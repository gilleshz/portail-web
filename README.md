# Portail Web

Ce projet est une application Angular développée en tant que projet universitaire pour l'UE *Portails web d'entreprise* lors de ma deuxième année de Master Génie Informatique à l'UFR MIM de Metz.

Il s'agit d'un portail web qui propose les fonctionnalités suivantes :

#### Connexion
La première page visible sur le portail doit être la page de connexion. La connexion se fait avec une adresse mail et un mot de passe. Il ne doit pas être possible pour un utilisateur quelconque de créer un compte, les comptes seront créés via la console firebase pour limiter les utilisateurs.
#### Dashboard
Une fois connecté, la page principale doit contenir un résumé des différentes autres fonctionnalités. Toutes les fonctionnalités doivent être accessibles via un menu.
#### Confidentialité
L’application doit gérer trois types d’utilisateurs : les administrateurs, les employés et les clients. 
#### Actualités
Les administrateurs doivent pouvoir ajouter des actualités en HTML. Les employés et les clients doivent pouvoir consulter ces actualités.
#### GED
Les administrateurs et les employés doivent pouvoir ajouter des documents. Tout le monde peut consulter ces documents.
#### Trombinoscope
L’ensemble des utilisateurs doit accéder au détail des utilisateurs. La fiche d’un utilisateur contient son adresse mail, son rôle, son équipe, son numéro de téléphone et éventuellement une photo. Les clients ne peuvent pas modifier leur fiche. Les employés peuvent modifier leur propre fiche, et les administrateurs peuvent modifier les fiches de tout le monde.

## Installation et démarrage

Suivez ce guide rapide pour lancer le projet sur votre ordinateur.

## Prérequis

Pour récupérer le code et démarrer l'application vous aurez besoin de :

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/)
- [Angular CLI](https://angular.io/cli)
- [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)

Un environnement de développement intégré (IDE) comme [IntelliJ IDEA](https://www.jetbrains.com/idea/) ou [Visual Studio Code](https://code.visualstudio.com/) est fortment recommandé.

## 1. Clonage du dépôt git

```shell
git clone https://github.com/gilleshz/portail-web
```

## 2. Démarrage de l'application

Exécutez la commande suivante pour démarrer le serveur de développement

```shell
ng serve
```

## 3. Accéder au portail web

Quand l'application a été démarrée, le portail web est accessible à l'uri suivant : http://localhost:4200/

## 4. Déploiement

#### Déploiement manuel

Pour déployer le projet sur Firebase Hosting, exécuter les commandes suivantes :

```shell script
ng build
firebase deploy
```

#### Déploiement automatique

L'application est automatiquement déployée à chaque commit sur la branche master.
