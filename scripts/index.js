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

// PROCESS DATA
if (localStorage.getItem("profile_name") && localStorage.getItem("profile_description")) {
  profileName.textContent = localStorage.getItem("profile_name");
  profileDescription.textContent = localStorage.getItem("profile_description");
} else {
  profileName.textContent = "Жак-Ив Кусто";
  profileDescription.textContent = "Исследователь океана";
}

// --------------------------------

// PROCESS ELEMENTS

initialCards.forEach(({ name, link }) => {
  renderCard(name, link);
});

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener("click", () => {
    popup.classList.remove("popup_active");
  });
});

buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  popupEditProfile.classList.add("popup_active");
});

buttonAddCard.addEventListener("click", () => {
  popupAddCard.classList.add("popup_active");
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  localStorage.setItem("profile_name", profileName.textContent);
  localStorage.setItem("profile_description", profileDescription.textContent);

  popupEditProfile.classList.remove("popup_active");
});

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  renderCard(placeNameInput.value, placeLinkInput.value);
  placeNameInput.value = "";
  placeLinkInput.value = "";

  popupAddCard.classList.remove("popup_active");
});

// --------------------------------

// FUNCTIONS
function renderCard(name, link) {
  const card = `
    <article class="card">
      <img src="${link}" alt="${name}" class="card__image">
      <div class="card__image-overlay"></div>
      <div class="card__info">
        <h2 class="card__title">${name}</h2>
        <button type="button" class="card__like-button"></button>
      </div>
      <button type="button" class="card__delete-button"></button>
    </article>
  `;

  cardsGallery.insertAdjacentHTML("afterbegin", card);

  const cardDOM = cardsGallery.querySelector(".card");

  cardDOM.addEventListener("click", () => {
    cardPopup.classList.add("popup_active");
    const image = cardPopup.querySelector(".popup__image");
    const caption = cardPopup.querySelector(".popup__card-caption");
    console.log(image);

    image.src = link;
    image.alt = name;
    caption.textContent = name;
  });

  const likeButton = document.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = document.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
}

function deleteCard() {
  this.parentElement.remove();
}
