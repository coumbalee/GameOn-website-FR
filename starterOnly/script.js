"use strict";
// Déclaration des variables
const form = document.getElementById("reserve");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
let isValid = true;

// Ajout de l'event prevent default avec la liste de toutes les fonctions
form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeErrorClass();
  checkInputs();
  validateBirthdate();
  checkConditions();
  checkLocations();
  displayModal();
});

// Fonction qui vérifie que les champs des inputs soient valides
function checkInputs() {
  // trim pour empêcher les espaces blancs inutiles
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const quantityValue = quantity.value.trim();

  // Vérification de chaque champ
  if (!firstNameValue) {
    setErrorFor(firstName, "Veuillez saisir votre prénom ");
  } else if (firstNameValue.length < 2) {
    setErrorFor(
      firstName,
      "Veuillez saisir au moins 2 lettres pour votre prénom "
    );
  } else {
    setSuccessFor(firstName);
  }
  if (!lastNameValue) {
    setErrorFor(lastName, "Veuillez saisir votre nom");
  } else if (lastNameValue.length < 2) {
    setErrorFor(lastName, "Veuillez saisir au moins 2 lettres pour votre nom ");
  } else {
    setSuccessFor(lastName);
  }
  if (!emailValue) {
    setErrorFor(email, "Veuillez saisir votre email");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Cet email n' est pas valide");
  } else {
    setSuccessFor(email);
  }
  if (!quantityValue) {
    setErrorFor(quantity, "Veuillez choisir un nombre ");
  } else {
    setSuccessFor(quantity);
  }
}

// Fonction de controle de la date de naissance
function validateBirthdate() {
  const birthdateValue = birthdate.value.trim();
  const splitedBirthdate = birthdateValue.split("-");
  const year = splitedBirthdate[0];
  const month = splitedBirthdate[1];
  const day = splitedBirthdate[2];

  if (!year || !month || !day) {
    setErrorFor(birthdate, "Veuillez entrer votre date de naissance");
  } else {
    setSuccessFor(birthdate);
  }
}

// Fonction  en cas de champs vide
function setErrorFor(input, message) {
  const control = input.parentElement;
  const small = control.querySelector("small");
  // ajout de la classe "formData error"
  control.className = "formData error";
  small.innerText = message;
  isValid = false;
}
// Fonction  qui ajoute la classe de style en cas d'input valide
function setSuccessFor(input) {
  const control = input.parentElement;
  // ajout de la classe "formData success"
  control.className = "formData success";
}

// Fonction regex  pour l'email
function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// Fonction qui vérifie si une ville est selectionnée
function checkLocations() {
  const location = document.querySelector("input[type=radio]:checked");
  /*console.log(location);*/
  if (!location) {
    const input = document.querySelector("input[type=radio]");
    setErrorFor(input, "Veuillez sélectionner une ville");
  }
}

// Fonction qui supprime les messages d' erreurs après qu'ils soient valides
function removeErrorClass() {
  isValid = true;
  const errors = document.querySelectorAll(".error");
  for (const error of errors) {
    error.classList.remove("error");
  }
}

// Fonction pour verifier les conditions d' utilisations soient cochées
function checkConditions() {
  const conditions = document.querySelector("#checkbox1").checked;
  console.log(conditions);
  if (!conditions) {
    const errorConditions = document.querySelector("#checkbox1");
    setErrorFor(
      errorConditions,
      "Veuillez accépter les conditions d'utilisation"
    );
  }
}

// supprimer le formulaire après validation et laisser apparaitre le message final de succès
function displayModal() {
  if (isValid) {
    const displayForm = document.getElementById("reserve");
    displayForm.remove();

    showFinalMessage();
  }
}
// fonction qui laisse apparaitre le message final
function showFinalMessage() {
  const element = document.querySelector(".final");
  element.className = "finalSuccess";
}

// fonction pour fermer le message au clic sur le bouton "fermer"
document.getElementById("btn-close").addEventListener("click", function () {
  closeModal();
});

//  fermeture du message au clic sur le bouton (x)
document.querySelector(".close").addEventListener("click", function () {
  closeModal();
});

function closeModal() {
  const removeModal = document.querySelector(".bground");
  removeModal.remove();
}
