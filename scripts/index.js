import initialCards from "../config/cards.config.js";

// ELEMENTS DECLARATION

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
const editProfileForm = popupEditProfile.querySelector(".popup__form");
const addCardForm = popupAddCard.querySelector(".popup__form");

// popup inputs
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");

const placeNameInput = document.getElementById("place__name");
const placeLinkInput = document.getElementById("place__link");

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

editProfileForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleNewCardSubmit);

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
  const cardTemplate = document.getElementById("card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  cardElement.querySelector(".card__image-overlay").addEventListener("click", () => {
    openPopup(cardPopup);

    const image = cardPopup.querySelector(".popup__image");
    const caption = cardPopup.querySelector(".popup__image-caption");

    image.src = link;
    image.alt = name;
    caption.textContent = name;
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
  addCardForm.reset();

  closePopup(popupAddCard);
}

function deleteCard() {
  event.target.closest("article").remove();
}
