import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._templateSelector = templateSelector;
  }

  _getPlaceElement() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    return placeElement;
  }

  _getPlaceDetails() {
    this._place = this._getPlaceElement();
    this._placeTitle = this._place.querySelector(".place__title");
    this._placeImage = this._place.querySelector(".place__image");
    this._placeLikeButton = this._place.querySelector(".place__love-button");
    this._placeDeleteButton = this._place.querySelector(
      ".place__delete-button"
    );

    this._placeTitle.textContent = this._name;
    this._placeImage.src = this._link;
    this._placeImage.alt = `${this._name} picture`;
  }

  _likeCard() {
    this._placeLikeButton.classList.toggle("place__love-button_active");
  }

  _deleteCard() {
    const placeToBeDeleted = this._placeDeleteButton.closest(".place");
    placeToBeDeleted.remove();
  }

  _setEventListeners() {
    const ImagePopup = new PopupWithImage(this._data, ".popup_type_image");

    ImagePopup.setEventListeners();

    this._placeLikeButton.addEventListener("click", () => {
      this._likeCard();
    });

    //deletes the card when its delete icon is clicked
    this._placeDeleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    //fills the popup with the image clicked
    //and its location, then it reveals the popup
    this._placeImage.addEventListener("click", () => {
      ImagePopup.open();
    });
  }

  generateCard() {
    this._getPlaceDetails();
    this._setEventListeners();
    return this._place;
  }
}
