const likeButtons = document.querySelectorAll('.card__like-button');
const name = document.querySelector('.profile__name').innerHTML;
const description = document.querySelector('.profile__subtitle').innerHTML;
const editButton = document.querySelector('.profile__edit-button');
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
  nameInput.value = name
  const descriptionInput = document.getElementById('description')
  descriptionInput.value = description
  popup.classList.add('popup_active')
});

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_active')
  console.log('close')
})
