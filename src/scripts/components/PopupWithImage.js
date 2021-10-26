import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    const popupImage = this._popupElement.querySelector(".popup__image");
    const popupImageLocation = this._popupElement.querySelector(
      ".popup__image-location"
    );
    popupImage.src = link;
    popupImage.alt = `${name} picture`;
    popupImageLocation.textContent = name;
    super.open();
  }
}
