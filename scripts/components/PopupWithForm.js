import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {}

  close() {
    super.close();
    this._popupForm.reset();
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
