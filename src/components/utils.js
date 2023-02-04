import {closePopup} from "./modals";

function disableButton(submitButton, inactiveButtonClass = 'popup__button_inactive') {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      const popup = evt.target.parentNode.parentNode;
      const form = evt.target;

      closePopup(popup);
      form.reset();
      disableButton(submitButton);
    })
    .catch((err) => {
      console.log(`olala, we have the error: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

export {handleSubmit}