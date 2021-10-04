const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageLocation = document.querySelector(".popup__image-location");
const popupTypeImageCloseButton = document.querySelector(
  ".popup_type_image .popup__close-button"
);

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
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
    this._placeImage.alt = this._name + " picture";
  }

  _likeCard() {
    this._placeLikeButton.classList.toggle("place__love-button_active");
  }

  _deleteCard() {
    let placeToBeDeleted = this._placeDeleteButton.closest(".place");
    placeToBeDeleted.remove();
    placeToBeDeleted = null;
  }

  _handleEscapeKey(evt) {
    if (evt.key === "Escape") {
      this._closePopup();
    }
  }
  //adds event to the document
  _addEventToDocument() {
    document.addEventListener("keydown", (e) => {
      this._handleEscapeKey(e);
    });
  }

  //removes event to the document
  _removeEventFromDocument() {
    document.removeEventListener("keydown", (e) => {
      this._handleEscapeKey(e);
    });
  }

  _openPopup() {
    popupTypeImage.classList.add("popup_opened");
    this._addEventToDocument();
  }

  _closePopup() {
    popupTypeImage.classList.remove("popup_opened");
    this._removeEventFromDocument();
  }

  _openImagePopup() {
    popupImage.src = this._link;
    popupImage.alt = `${this._name} picture`;
    popupImageLocation.textContent = this._name;
    this._openPopup();
  }

  _setEventListeners() {
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
      this._openImagePopup();
    });

    popupTypeImageCloseButton.addEventListener("click", () => {
      this._closePopup();
    });
  }

  generateCard() {
    this._getPlaceDetails();
    this._setEventListeners();
    return this._place;
  }
}
