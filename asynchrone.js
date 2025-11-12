//Liste d'utilisateurs : https://jsonplaceholder.typicode.com/users
//Membre 1 - Récupérer et afficher les utilisateurs (5 utilisateurs avec pagination) :

//Utilisez l'API https://jsonplaceholder.typicode.com/users.
// Affichez les 5 premiers utilisateurs sur la page.
// Ajoutez des boutons de pagination pour charger les utilisateurs suivants (affichage de 5 utilisateurs par page). Lorsqu'on clique sur le bouton "Suivant", les 5 utilisateurs suivants doivent être chargés.

//partie DE NISSRINE: UTILISATEURS:

// Sélection des éléments HTML
const zoneUtilisateurs = document.getElementById("user-list"); // zone d’affichage des utilisateurs
const etiquettePage = document.getElementById("page-users"); // numéro de page
const boutonPrecedent = document.getElementById("prev-users"); // bouton précédent
const boutonSuivant = document.getElementById("next-users"); // bouton suivant
const boutonToutAfficher = document.getElementById("all-users"); // bouton tout afficher

// Variables pour la pagination
let utilisateurs = []; // tableau des utilisateurs
let pageActuelle = 1; // page en cours
const utilisateursParPage = 5; // 5 utilisateurs par page
let afficherTout = false; // false = pagination, true = tout afficher

// 1️Fonction pour aller chercher les utilisateurs
async function recupererUtilisateurs() {
  const reponse = await fetch("https://jsonplaceholder.typicode.com/users");
  utilisateurs = await reponse.json();

  pageActuelle = 1;
  afficherTout = false;
  afficherUtilisateurs();
}

// 2️ Fonction pour afficher les utilisateurs (sans innerHTML)
function afficherUtilisateurs() {
  // On vide d’abord le contenu précédent
  zoneUtilisateurs.textContent = "";

  let utilisateursAAfficher = [];

  if (afficherTout) {
    utilisateursAAfficher = utilisateurs;
    etiquettePage.textContent = `Tous (${utilisateurs.length})`;
  } else {
    const debut = (pageActuelle - 1) * utilisateursParPage;
    const fin = debut + utilisateursParPage;
    utilisateursAAfficher = utilisateurs.slice(debut, fin);

    const totalPages = Math.ceil(utilisateurs.length / utilisateursParPage);
    etiquettePage.textContent = `Page ${pageActuelle} / ${totalPages}`;
  }

  // Pour chaque utilisateur → créer un élément <p>
  utilisateursAAfficher.forEach((utilisateur) => {
    const paragraphe = document.createElement("p");

    const nom = document.createElement("b");
    nom.textContent = utilisateur.name;

    const email = document.createTextNode(" — " + utilisateur.email);

    paragraphe.appendChild(nom);
    paragraphe.appendChild(email);

    zoneUtilisateurs.appendChild(paragraphe);
  });
}

// 3️ Gestion des boutons
boutonSuivant.addEventListener("click", () => {
  const totalPages = Math.ceil(utilisateurs.length / utilisateursParPage);
  if (pageActuelle < totalPages) {
    pageActuelle++;
    afficherUtilisateurs();
  }
});

boutonPrecedent.addEventListener("click", () => {
  if (pageActuelle > 1) {
    pageActuelle--;
    afficherUtilisateurs();
  }
});

boutonToutAfficher.addEventListener("click", () => {
  afficherTout = true;
  afficherUtilisateurs();
});

// 4️ Lancer la récupération des données au démarrage
recupererUtilisateurs();
