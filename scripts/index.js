import initialCards from "../config/cards.config.js";

// ELEMENTS DECLARATION

// templates
const cardTemplate = document.getElementById("card-template").content;

// common elements
const cardsGallery = document.querySelector(".cards-gallery");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__subtitle");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// popups
const popups = document.querySelectorAll(".popup");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const cardPopup = document.querySelector(".popup_type_card");

// popup forms
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");

// popup elements
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");

const placeNameInput = document.getElementById("place__name");
const placeLinkInput = document.getElementById("place__link");

const imageCardPopup = cardPopup.querySelector(".popup__image");
const captionCardPopup = cardPopup.querySelector(".popup__image-caption");

// --------------------------------

// PROCESS ELEMENTS

initialCards.forEach(({ name, link }) => {
  const card = createCard(name, link);
  renderCard(card);
});

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closePopup(popup));
});

buttonEditProfile.addEventListener("click", setEditPopupInputs);

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
