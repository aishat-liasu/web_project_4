import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback;
    this._popupForm = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    this._formValues = {};
    this._popupForm
      .querySelectorAll(".popup__field")
      .forEach((input) => (this._formValues[input.name] = input.value));
  }

  _handleSubmitEvent = (e) => {
    e.preventDefault();
    this._getInputValues();
    this._callback(this._formValues);
    super.close();
    this._popupForm.reset();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmitEvent);
  }
}
