function closeByEscape(evt) {
  if (evt.key.toLowerCase() === "escape") {
    const activePopup = document.querySelector(".popup_active");
    closePopup(activePopup);
  }
}
function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener('keydown', closeByEscape)
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener('keydown', closeByEscape)
}

export {openPopup, closePopup}
