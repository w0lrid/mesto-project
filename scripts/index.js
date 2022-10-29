// common elements
const likeButtons = document.querySelectorAll('.card__like-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subtitle');
const editButton = document.querySelector('.profile__edit-button');

// popup elements
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description')
const saveButton = document.querySelector('.popup__button');
const closeButton = document.querySelector('.popup__close');

if (localStorage.getItem('profile_name') && localStorage.getItem('profile_description')) {
  profileName.textContent = localStorage.getItem('profile_name')
  profileDescription.textContent = localStorage.getItem('profile_description')
} else {
  profileName.textContent = 'Жак-Ив Кусто';
  profileDescription.textContent = 'Исследователь океана';
}

likeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('card__like-button_active');
  })
})

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent
  descriptionInput.value = profileDescription.textContent

  popup.classList.add('popup_active')
});

popupForm.addEventListener('submit', (event) => {
  event.preventDefault()
  
  profileName.textContent = nameInput.value
  profileDescription.textContent = descriptionInput.value
  
  localStorage.setItem('profile_name', profileName.textContent)
  localStorage.setItem('profile_description', profileDescription.textContent)
  
  popup.classList.remove('popup_active')
})

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_active')
})
