export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._popupElement.classList.add("popup_opened");
  }
  close() {
    this._popupElement.classList.remove("popup_opened");
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleClickOutsideForm(evt) {
    if (evt.target.classList.contains(evt.target.id)) {
      this.close();
    }
  }
  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      this._handleClickOutsideForm(evt);
    });

    this._popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", () => this.close());
  }
}
