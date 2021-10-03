export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getPopupDetails() {
    this._popupTypeImage = document.querySelector(".popup_type_image");
    this._popupImage = document.querySelector(".popup__image");
    this._popupImageLocation = document.querySelector(".popup__image-location");
    this._popupTypeImageCloseButton = document.querySelector(
      ".popup_type_image .popup__close-button"
    );
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
    this._placeToBeDeleted = this._placeDeleteButton.closest(".place");
    this._placeToBeDeleted.remove();
    this._placeToBeDeleted = null;
  }

  handleEscapeKey(evt) {
    const openedPopup = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
      this._closePopup(openedPopup);
    }
  }
  //adds event to the document
  _addEventToDocument() {
    document.addEventListener("keydown", handleEscapeKey);
  }

  //removes event to the document
  _removeEventFromDocument() {
    document.removeEventListener("keydown", handleEscapeKey);
  }

  _openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
    this._addEventToDocument();
  }

  _closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
    this._removeEventFromDocument();
  }

  _openImagePopup() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name + " picture";
    this._popupImageLocation.textContent = this._name;
    this._openPopup(this._popupTypeImage);
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
    this._popupTypeImageCloseButton.addEventListener("click", () => {
      this._closePopup(this._popupTypeImage);
    });
  }

  generateCard() {
    this._getPlaceDetails();
    this._getPopupDetails();
    this._setEventListeners();
    return this._place;
  }
}
