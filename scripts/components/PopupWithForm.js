import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback;
    //this._popupForm = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {}

  close() {
    super.close();
    this._popupElement.querySelector(".popup__form").reset();
  }

  handleSubmitEvent() {}

  setEventListeners() {
    super.setEventListeners();
    const popupCloseButton = this._popupElement.querySelector(
      ".popup__close-button"
    );
    const popupSubmitButton = this._popupElement.querySelector(
      ".popup__submit-button"
    );
    popupCloseButton.addEventListener("click", () => this.close());
    popupSubmitButton.addEventListener("click", () => this.handleSubmitEvent());
  }
}
