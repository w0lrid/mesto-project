import {
  editUser,
  getInitialCards,
  getUser,
  sendCard,
  likeCard,
  unlikeCard,
  editAvatar
} from "./components/api";
import {enableValidation} from "./components/validate";
import {openPopup, closePopup} from "./components/modals";
import {renderCard, removeCard} from "./components/cards";
import {handleSubmit} from "./components/utils";

import './styles/index.css';

import AddButton from './images/add-button.svg';
import AddButtonBig from './images/add-button_big.svg';
import CloseButton from './images/close-button.svg'
import DeleteButton from './images/delete-button.svg'
import EditButton from './images/edit-button.svg'
import EditButtonBig from './images/edit-button_big.svg'
import LikeButton from './images/like-button.svg'
import LikeButtonActive from './images/like-button_active.svg'
import MestoLogo from './images/mesto_logo.svg'

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

// ELEMENTS DECLARATION

// templates
const cardTemplate = document.querySelector("#card-template").content;

// common elements
const cardsGallery = document.querySelector(".cards-gallery");
const profileAvatarContainer = document.querySelector(".profile__avatar-container");
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
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const cardPopup = document.querySelector(".popup_type_card");

// popup forms
const formEditAvatar = popupEditAvatar.querySelector(".popup__form");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const formAddCard = popupAddCard.querySelector(".popup__form");
const formDeleteCard = popupDeleteCard.querySelector(".popup__form");

// popup elements
const avatarInput = document.querySelector("#avatar-input");

const nameInput = document.querySelector("#username-input");
const descriptionInput = document.querySelector("#user-description-input");

const placeNameInput = document.querySelector("#place-name-input");
const placeLinkInput = document.querySelector("#place-link-input");

const imageCardPopup = cardPopup.querySelector(".popup__image");
const captionCardPopup = cardPopup.querySelector(".popup__image-caption");

// --------------------------------

// PROCESS ELEMENTS
let userID, deleteCardID;
Promise.all([getUser(), getInitialCards()])
  .then(([user, cards]) => {
    const {avatar, name, about, _id} = user;

    profileAvatar.src = avatar;
    profileName.textContent = name;
    profileDescription.textContent = about;
    userID = _id;

    cards.reverse().forEach(({likes, name, link, owner, _id}) => {
      const card = createCard(likes, name, link, owner._id, _id);
      renderCard(cardsGallery, card);
    })
  })
  .catch(err => {
    console.log(`olala, we've the error: ${err}`);
  })

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup")) {
      closePopup(evt.currentTarget);
    }
  })
})

buttonEditProfile.addEventListener("click", setEditPopupInputs);
profileAvatarContainer.addEventListener("click", () => {
  openPopup(popupEditAvatar)
});
buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
});
formEditAvatar.addEventListener("submit", handleAvatarEditSubmit);
formEditProfile.addEventListener("submit", handleProfileEditSubmit);
formAddCard.addEventListener("submit", handleNewCardSubmit);
formDeleteCard.addEventListener("submit", (evt) => removeCard(evt, deleteCardID))

// --------------------------------

// FUNCTIONS
function setEditPopupInputs() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
}

function createCard(likes, name, link, ownerID, cardID) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = name;
  cardElementImage.src = link;
  cardElementImage.alt = name;
  cardElement.dataset.id = cardID;

  cardElementImage.addEventListener("click", () => {
    openPopup(cardPopup);

    imageCardPopup.src = link;
    imageCardPopup.alt = name;
    captionCardPopup.textContent = name;
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikesNumber = cardElement.querySelector(".card__likes-number");

  if (likes) {
    if (likes.length > 0) {
      cardLikesNumber.textContent = likes.length
    }

    likes.forEach(like => {
      if (like._id === userID) {
        likeButton.classList.add("card__like-button_active");
      }
    })
    likeButton.addEventListener("click", () => handleLikeCard(cardID, likeButton, cardLikesNumber));
  }

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (userID === ownerID) {
    deleteButton.addEventListener("click", () => {
      deleteCardID = cardID;
      openPopup(popupDeleteCard);
    });
  } else {
    deleteButton.remove()
  }

  return cardElement;
}

function handleAvatarEditSubmit(evt) {
  const makeRequest = () => editAvatar({avatar: avatarInput.value})
    .then(res => {
      profileAvatar.src = res.avatar;
    })

  handleSubmit(makeRequest, evt);
}

function handleProfileEditSubmit(evt) {
  const makeRequest = () => editUser({
    name: nameInput.value,
    about: descriptionInput.value,
  })
    .then(userData => {
      const {name, about} = userData
      profileName.textContent = name;
      profileDescription.textContent = about;
    });

  handleSubmit(makeRequest, evt);
}

function handleNewCardSubmit(evt) {
  const makeRequest = () => sendCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  })
    .then(res => {
      const {likes, name, link, owner, _id} = res;
      const card = createCard(likes, name, link, owner._id, _id);

      renderCard(cardsGallery, card);
    });

  handleSubmit(makeRequest, evt);
}

function handleLikeCard(cardID, likeButton, likes) {
  if (Array.from(likeButton.classList).includes("card__like-button_active")) {
    unlikeCard(cardID)
      .then(res => {
        likes.textContent = res.likes.length;
        removeLike(likeButton);
      })
      .catch(err => {
        console.log(`olala, we've the error: ${err}`);
      });
  } else {
    likeCard(cardID)
      .then(res => {
        likes.textContent = res.likes.length;
        addLike(likeButton);
      })
      .catch(err => {
        console.log(`olala, we've the error: ${err}`);
      });
  }
}

function addLike(likeButton) {
  likeButton.classList.add("card__like-button_active");
}

function removeLike(likeButton) {
  likeButton.classList.remove("card__like-button_active");
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
