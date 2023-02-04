import {closePopup} from "./modals";
import {deleteCard} from "./api";
import {handleSubmit} from "./utils";

function renderCard(gallery, card) {
  gallery.prepend(card);
}

function removeCard(evt, cardID) {
  const makeRequest = () => {
    return deleteCard(cardID).then(() => {
      document.querySelector(`[data-id="${cardID}"]`).remove()
    })
  }

  handleSubmit(makeRequest, evt);
}

export {renderCard, removeCard}