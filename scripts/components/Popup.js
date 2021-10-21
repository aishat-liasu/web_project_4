export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  //adds event to the document
  _addEventToDocument() {
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }

  //removes event to the document
  _removeEventFromDocument() {
    document.removeEventListener("keydown", this._handleEscClose);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    this._addEventToDocument();
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    this._removeEventFromDocument();
  }

  _handleClickOutsidePopup(evt) {
    if (evt.target.classList.contains(evt.target.id)) {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      this._handleClickOutsidePopup(evt);
    });

    this._popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", () => this.close());
  }
}
