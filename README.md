# Compte Rendu Projet de Git R5.07

24/11/2023
Léo FILSNOEL
Doriane RICHARD
Kelyan PEGEOT-SELME
Aymeric SABATIER

## Workflow : Merge

## Ojectif : Mettre en pratique les principes DevOps en développant deux fonctionnalités pour un jeu d'échec.

## 1 - Organisation du travail au sein de l'équipe

Nous avons constitué deux binômes pour le développement de deux fonctionnalités au sein du projet. La première fonctionnalité concerne la promotion d'un pion aux échecs lorsqu'il atteint la rangée adverse la plus éloignée (rangée 8 pour les blancs, rangée 1 pour les noirs). La seconde fonctionnalité porte sur l'amélioration de l'expérience utilisateur en introduisant un aperçu visuel indiquant à l'utilisateur les cases possibles pour chaque pièce lorsqu'elle est sélectionnée.

Comme demandé dans le sujet, nous avons choisi d'adopter une approche structurée en créant deux branches secondaires dédiées à chaque fonctionnalité. Cette démarche vise à assurer une gestion claire et efficace des différentes évolutions du code. Nous avons développé nos fonctionnalités selon une approche TDD permettant de faciliter le développement et d'éviter d'ajouter du code superflue.

Pour faciliter la coordination au sein de notre équipe, nous avons opté pour la mise en place d'un workflow merge afin de garantir la continuité du développement tout en minimisant les conflits potentiels entre les fonctionnalités en cours de réalisation. De plus, pour assurer la propreté et l'harmonie du workflow git, nous avons décidé de mettre en place une structure simple pour les messages de commit. Nous avons choisi de rédiger systématiquement nos commits en anglais en les composant d'un verbe d'action (add, delete, fix…), suivi des fonctionnalités ajoutées, supprimées ou modifiées.

En parallèle, afin de renforcer la qualité du code produit, nous avons introduit le concept de "Merge Request". Ce mécanisme offre un suivi rigoureux du développement et de l'intégration en soumettant chaque branche secondaire à l'approbation des membres du binôme n'ayant pas directement contribué à la Merge Request. Cette démarche favorise une évaluation croisée du code de qui permet de garantir un niveau élevé de qualité dans l'intégration des fonctionnalités au code principal.

:smiley:
