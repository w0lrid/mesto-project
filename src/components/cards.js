import {closePopup, openPopup} from "./modals";
import {deleteCard} from "./api";

function renderCard(gallery, card) {
  gallery.prepend(card);
}

function removeCard(evt, cardID, popupDeleteCard) {
  evt.preventDefault();

  deleteCard(cardID)
    .then(() => {
      document.querySelector(`[data-id="${cardID}"]`).remove();
      closePopup(popupDeleteCard);
    })
    .catch(err => {
      console.log(`olala, we've the error: ${err}`);
    });
}

export {renderCard, removeCard}