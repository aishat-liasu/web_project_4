import Popup from "./Popup";

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageLocation = document.querySelector(".popup__image-location");
const popupTypeImageCloseButton = document.querySelector(
  ".popup_type_image .popup__close-button"
);

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    super.open();

    popupImage.src = this._link;
    popupImage.alt = `${this._name} picture`;
    popupImageLocation.textContent = this._name;
  }
}
