import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback;
    this._popupForm = this._popupElement.querySelector(".popup__form");
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
  _getInputValues() {
    this._formValues = {};
    this._popupForm
      .querySelectorAll(".popup__field")
      .forEach((input) => (this._formValues[input.name] = input.value));
  }

  _onUpload = () => {
    this.submitButton = this._popupForm.querySelector(".popup__submit-button");
    this.submitButton.textContent = "Saving...";
  };

  _afterUpload = () => {
    this.submitButton.textContent = "Save";
  };

  _handleSubmitEvent = (e) => {
    e.preventDefault();
    this._getInputValues();

    this._callback(this._formValues, this._onUpload, this._afterUpload);
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmitEvent);
  }
}
