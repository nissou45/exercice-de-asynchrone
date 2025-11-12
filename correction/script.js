// Variables pour gérer la pagination
const usersPerPage = 5;
const postsPerPage = 5;
const commentsPerPage = 20;

let allUsers = [];
let allPosts = [];
let allComments = [];

let currentPageUsers = 1;
let currentPagePosts = 1;
let currentPageComments = 1;

// Fonction pour récupérer les données de l'API
async function fetchData(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Loading ${url.split('/').pop()} data failed`);
	}
	return await response.json();
}

// Fonction pour charger les utilisateurs, posts et commentaires
async function loadAllData() {
	try {
		const [usersResult, postsResult, commentsResult] = await Promise.allSettled(
			[
				fetchData('https://jsonplaceholder.typicode.com/users'),
				fetchData('https://jsonplaceholder.typiode.com/posts'),
				fetchData('https://jsonplaceholder.typicode.com/comments'),
			]
		);

		// Vérification des résultats et gestion des erreurs
		allUsers = usersResult.status === 'fulfilled' ? usersResult.value : [];
		if (usersResult.status === 'rejected') {
			console.error(
				'Erreur lors du chargement des utilisateurs :',
				usersResult.reason.message
			);
		}

		allPosts = postsResult.status === 'fulfilled' ? postsResult.value : [];
		if (postsResult.status === 'rejected') {
			displayErrorMessage(
				'Une erreur est survenue dans le chargement des posts',
				'posts'
			);
		}

		allComments =
			commentsResult.status === 'fulfilled' ? commentsResult.value : [];
		if (commentsResult.status === 'rejected') {
			console.error(
				'Erreur lors du chargement des commentaires :',
				commentsResult.reason.message
			);
		}
	} catch (error) {
		console.error("Une erreur inattendue s'est produite :", error.message);
	}

	// Initialiser l'affichage des données
	displayUsers(currentPageUsers);
	displayPosts(currentPagePosts);
	displayComments(currentPageComments);
}

// Fonction pour afficher un message d'erreur et masquer les boutons
function displayErrorMessage(message, name) {
	toggleNavigationButtons(false, name);

	const errorMessageContainer = document.getElementById('errorMessage');

	if (errorMessageContainer) {
		errorMessageContainer.textContent = message;
		errorMessageContainer.style.display = 'block'; // Afficher le conteneur
	}
}

function toggleNavigationButtons(isEnabled, name) {
	// Sélection dynamique des boutons "Suivant" et "Précédent"
	const nextButton = document.getElementById(`prev-button-${name}`);
	const prevButton = document.getElementById(`next-button-${name}`);

	if (nextButton) {
		'isEnabledNext', isEnabled;
		nextButton.style.display = isEnabled ? 'inline-block' : 'none';
	}

	if (prevButton) {
		'isEnabledNext', isEnabled;
		prevButton.style.display = isEnabled ? 'inline-block' : 'none';
	}
}

// Fonction pour afficher les utilisateurs
function displayUsers(page) {
	const startIndex = (page - 1) * usersPerPage;
	const endIndex = startIndex + usersPerPage;
	const usersToDisplay = allUsers.slice(startIndex, endIndex);

	const userList = document.getElementById('user-list');

	userList.innerHTML = '';
	'userList', userList.innerHTML;
	'userToDisplay', usersToDisplay;

	usersToDisplay.forEach((user) => {
		const li = document.createElement('li');
		li.textContent = `${user.name} - ${user.email}`;
		userList.appendChild(li);
	});

	document.getElementById('page-number-users').textContent = `Page ${page} `;
	updatePaginationButtons('users');
}

function displayAllUsers() {
	const userList = document.getElementById('user-list');
	userList.innerHTML = '';
	allUsers.forEach((user) => {
		const li = document.createElement('li');
		li.textContent = `${user.name} - ${user.email}`;
		userList.appendChild(li);
	});
}

// Fonction pour afficher les posts
function displayPosts(page) {
	const startIndex = (page - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;
	const postsToDisplay = allPosts.slice(startIndex, endIndex);

	const postList = document.getElementById('post-list');
	postList.innerHTML = '';
	postsToDisplay.forEach((post) => {
		const li = document.createElement('li');
		li.textContent = post.title;
		postList.appendChild(li);
	});

	document.getElementById('page-number-posts').textContent = `Page ${page}`;
	updatePaginationButtons('posts');
}

// Fonction pour afficher les commentaires
function displayComments(page) {
	const startIndex = (page - 1) * commentsPerPage;
	const endIndex = startIndex + commentsPerPage;
	const commentsToDisplay = allComments.slice(startIndex, endIndex);

	const commentList = document.getElementById('comment-list');
	commentList.innerHTML = '';
	commentsToDisplay.forEach((comment) => {
		const li = document.createElement('li');
		li.textContent = comment.body;
		commentList.appendChild(li);
	});

	document.getElementById('page-number-comments').textContent = `Page ${page}`;
	updatePaginationButtons('comments');
}

// Fonction pour mettre à jour l'état des boutons de pagination
function updatePaginationButtons(type) {
	let currentPage;
	let totalItems;
	let itemsPerPage;
	let nextButton;
	let prevButton;

	if (type === 'users') {
		currentPage = currentPageUsers;
		totalItems = allUsers.length;
		itemsPerPage = usersPerPage;
		nextButton = document.getElementById('next-button-users');
		prevButton = document.getElementById('prev-button-users');
	} else if (type === 'posts') {
		currentPage = currentPagePosts;
		totalItems = allPosts.length;
		itemsPerPage = postsPerPage;
		nextButton = document.getElementById('next-button-posts');
		prevButton = document.getElementById('prev-button-posts');
	} else if (type === 'comments') {
		currentPage = currentPageComments;
		totalItems = allComments.length;
		itemsPerPage = commentsPerPage;
		nextButton = document.getElementById('next-button-comments');
		prevButton = document.getElementById('prev-button-comments');
	}

	// Désactivation du bouton "Suivant" si on est à la dernière page
	if (currentPage * itemsPerPage >= totalItems) {
		nextButton.disabled = true;
	} else {
		nextButton.disabled = false;
	}

	// Désactivation du bouton "Précédent" si on est à la première page
	if (currentPage === 1) {
		prevButton.disabled = true;
	} else {
		prevButton.disabled = false;
	}
}

// Gestion des événements de pagination
document.getElementById('next-button-users').addEventListener('click', () => {
	currentPageUsers++;
	displayUsers(currentPageUsers);
});

document.getElementById('prev-button-users').addEventListener('click', () => {
	currentPageUsers--;
	displayUsers(currentPageUsers);
});

document.getElementById('next-button-posts').addEventListener('click', () => {
	currentPagePosts++;
	displayPosts(currentPagePosts);
});

document.getElementById('prev-button-posts').addEventListener('click', () => {
	currentPagePosts--;
	displayPosts(currentPagePosts);
});

document
	.getElementById('next-button-comments')
	.addEventListener('click', () => {
		currentPageComments++;
		displayComments(currentPageComments);
	});

document
	.getElementById('prev-button-comments')
	.addEventListener('click', () => {
		currentPageComments--;
		displayComments(currentPageComments);
	});

// Ajouter un gestionnaire d'événement pour le bouton "Charger toutes les données"
document.getElementById('load-all-users').onclick = function ($event) {
	const button = this;
	'hello', button;
	'Button clicked, current text: ' + button.textContent;
	if (button.innerText === 'Charger tous les utilisateurs') {
		// Affiche tous les utilisateurs
		displayAllUsers();

		toggleNavigationButtons(false, 'users');
		button.textContent = 'Mettre la pagination'; // Changer le texte du bouton
	} else {
		// Réactiver la pagination
		displayUsers(currentPageUsers);

		toggleNavigationButtons(true, 'users'); // Réactiver les boutons de navigation
		button.innerText = 'Charger tous les utilisateurs'; // Changer le texte du bouton
	}
};

// Charger toutes les données au début
loadAllData();
