import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback;
  }

  close() {
    super.close();
    this._popupElement.querySelector(".popup__form").reset();
  }

  _handleSubmitEvent(e) {
    e.preventDefault();
    this._callback();
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement
      .querySelector(".popup__submit-button")
      .addEventListener("click", (e) => this._handleSubmitEvent(e));
  }
}
