const likeButtons = document.querySelectorAll('.card__like-button');
const profileName = document.querySelector('.profile__name').textContent;
const profileDescription = document.querySelector('.profile__subtitle').textContent;
const editButton = document.querySelector('.profile__edit-button');
const saveButton = document.querySelector('.popup__button');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup')

likeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('card__like-button_active')) {
      button.classList.remove('card__like-button_active');
    } else {
      button.classList.add('card__like-button_active');
    }
  })
})

editButton.addEventListener('click', () => {
  const nameInput = document.getElementById('name')
  nameInput.value = profileName

  const descriptionInput = document.getElementById('description')
  descriptionInput.value = profileDescription

  popup.classList.add('popup_active')
});

saveButton.addEventListener('click', () => {
  popup.classList.remove('popup_active')
})


closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_active')
})
