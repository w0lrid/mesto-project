function disableButton(formElement, submitButtonSelector = '.popup__button', inactiveButtonClass = 'popup__button_inactive') {
  formElement.reset();
  formElement.querySelector(submitButtonSelector).classList.add(inactiveButtonClass);
  formElement.querySelector(submitButtonSelector).disabled = true;
}

function processButton(formElement, submitButtonSelector = '.popup__button') {
  formElement.querySelector(submitButtonSelector).textContent = 'Сохранение...'
}

function finishButton(formElement, textButton, submitButtonSelector = '.popup__button') {
  formElement.querySelector(submitButtonSelector).textContent = textButton;
}

export {disableButton, processButton, finishButton}