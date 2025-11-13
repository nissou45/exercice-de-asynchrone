//Liste d'utilisateurs : https://jsonplaceholder.typicode.com/users
//Membre 1 - Récupérer et afficher les utilisateurs (5 utilisateurs avec pagination) :

//Utilisez l'API https://jsonplaceholder.typicode.com/users.
// Affichez les 5 premiers utilisateurs sur la page.
// Ajoutez des boutons de pagination pour charger les utilisateurs suivants (affichage de 5 utilisateurs par page). Lorsqu'on clique sur le bouton "Suivant", les 5 utilisateurs suivants doivent être chargés.

//partie DE NISSRINE: UTILISATEURS:

// Liste d'utilisateurs : https://jsonplaceholder.typicode.com/users
// Membre 1 - Récupérer et afficher les utilisateurs (5 utilisateurs avec pagination)

// Partie DE NISSRINE : UTILISATEURS

// Liste d'utilisateurs : https://jsonplaceholder.typicode.com/users
// Membre 1 - Récupérer et afficher les utilisateurs (5 utilisateurs avec pagination)

// Partie DE NISSRINE : UTILISATEURS

// Elément du DOM à manipulerconst bouton = document.getElementById("all-users");
// Liste d'utilisateurs : https://jsonplaceholder.typicode.com/users
// Membre 1 - Récupérer et afficher les utilisateurs (5 utilisateurs avec pagination)

// Partie DE NISSRINE : UTILISATEURS

// Éléments du DOM à manipuler
const bouton = document.getElementById("all-users");
const affichage = document.getElementById("user-list");
const suivant = document.getElementById("next-users");
const precedent = document.getElementById("prev-users");
const listeUtilisateurs = document.createElement("ul");

// Variables
let Utilisateurs = [];

// Récupération de l'API et affichage
document.addEventListener("DOMContentLoaded", async () => {
  await getUtilisateur();

  // ➜ On affiche les 5 premiers utilisateurs
  for (const element of Utilisateurs.slice(0, 5)) {
    console.log(element);
    const listeElement = document.createElement("li");
    listeElement.textContent = element.name;
    listeUtilisateurs.appendChild(listeElement);
  }

  // ➜ On ajoute la liste au HTML
  affichage.appendChild(listeUtilisateurs);

  // ➜ Bouton "Charger tous les utilisateurs"
  bouton.addEventListener("click", async () => {
    await getUtilisateur();
    listeUtilisateurs.innerHTML = "";
    for (const element of Utilisateurs.slice(0, 5)) {
      const listeElement = document.createElement("li");
      listeElement.textContent = element.name;
      listeUtilisateurs.appendChild(listeElement);
    }
    affichage.appendChild(listeUtilisateurs);
  });

  //  Bouton "Suivant"
  suivant.addEventListener("click", async () => {
    await getUtilisateur();
    listeUtilisateurs.innerHTML = "";
    for (const element of Utilisateurs.slice(5, 10)) {
      const listeElement = document.createElement("li");
      listeElement.textContent = element.name;
      listeUtilisateurs.appendChild(listeElement);
    }

    affichage.appendChild(listeUtilisateurs);
  });

  // ➜ Bouton "Précédent"
  precedent.addEventListener("click", async () => {
    await getUtilisateur();
    listeUtilisateurs.innerHTML = "";
    for (const element of Utilisateurs.slice(0, 5)) {
      const listeElement = document.createElement("li");
      listeElement.textContent = element.name;
      listeUtilisateurs.appendChild(listeElement);
    }
    affichage.appendChild(listeUtilisateurs);
  });
});

// ➜ Fonction pour récupérer les utilisateurs depuis l’API
async function getUtilisateur() {
  const reponse = await fetch("https://jsonplaceholder.typicode.com/users");
  Utilisateurs = await reponse.json(); // on enlève "const"
}
