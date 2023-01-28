// добавить импорты картинок проекта
import './styles/index.css';

import AddButton from '../images/add-button.svg';
import AddButtonBig from '../images/add-button_big.svg';
import CloseButton from '../images/close-button.svg'
import DeleteButton from '../images/delete-button.svg'
import EditButton from '../images/edit-button.svg'
import EditButtonBig from '../images/edit-button_big.svg'
import LikeButton from '../images/like-button.svg'
import LikeButtonActive from '../images/like-button_active.svg'
import MestoLogo from '../images/mesto_logo.svg'

const images = [
  {name: 'add-button', image: AddButton},
  {name: 'add-button_big', image: AddButtonBig},
  {name: 'close-button', image: CloseButton},
  {name: 'delete-button', image: DeleteButton},
  {name: 'edit-button', image: EditButton},
  {name: 'edit-button_big', image: EditButtonBig},
  {name: 'like-button', image: LikeButton},
  {name: 'like-button_active', image: LikeButtonActive},
  {name: 'mesto_logo', image: MestoLogo},
]

import initialCards from "../config/cards.config.js";

// ELEMENTS DECLARATION

// templates
const cardTemplate = document.getElementById("card-template").content;
const forms = document.forms;


// common elements
const cardsGallery = document.querySelector(".cards-gallery");
const profileAvatar = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__subtitle");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// popups
const popups = document.querySelectorAll(".popup");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const cardPopup = document.querySelector(".popup_type_card");

// popup forms
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");

// popup elements
const nameInput = document.getElementById("username-input");
const descriptionInput = document.getElementById("user-description-input");

const placeNameInput = document.getElementById("place-name-input");
const placeLinkInput = document.getElementById("place-link-input");

const imageCardPopup = cardPopup.querySelector(".popup__image");
const captionCardPopup = cardPopup.querySelector(".popup__image-caption");

// --------------------------------

// PROCESS ELEMENTS

initialCards.forEach(({name, link}) => {
  const card = createCard(name, link);
  renderCard(card);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key.toLowerCase() === "escape") {
    const activePopup = document.querySelector(".popup_active");

    if (activePopup) {
      closePopup(activePopup)
    }
  }
})

console.log(popups)
popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup")) {
      closePopup(evt.currentTarget);
    }
  })
})

buttonEditProfile.addEventListener("click", setEditPopupInputs);
profileAvatar.addEventListener("click", () => openPopup(popupEditAvatar));
buttonAddCard.addEventListener("click", () => openPopup(popupAddCard));
formEditProfile.addEventListener("submit", handleProfileEditSubmit);
formAddCard.addEventListener("submit", handleNewCardSubmit);

// --------------------------------

// FUNCTIONS

function openPopup(popup) {
  popup.classList.add("popup_active");
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
}

function setEditPopupInputs() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = name;
  cardElementImage.src = link;
  cardElementImage.alt = name;

  cardElementImage.addEventListener("click", () => {
    openPopup(cardPopup);

    imageCardPopup.src = link;
    imageCardPopup.alt = name;
    captionCardPopup.textContent = name;
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

function renderCard(card) {
  cardsGallery.prepend(card);
}

function handleProfileEditSubmit() {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(popupEditProfile);
}

function handleNewCardSubmit() {
  event.preventDefault();

  const card = createCard(placeNameInput.value, placeLinkInput.value);
  renderCard(card);
  formAddCard.reset();

  closePopup(popupAddCard);
}

function deleteCard() {
  event.target.closest("article").remove();
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
  } else {
    buttonElement.classList.remove('popup__button_inactive');
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    setEventListeners(formElement);
  })
}

enableValidation()