export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._fieldSelector = settings.fieldSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._fieldErrorClass = settings.fieldErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }

  _showFieldError(fieldElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${fieldElement.id}-error`
    );

    fieldElement.classList.add(this._fieldErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideFieldError(fieldElement) {
    const errorElement = this._formElement.querySelector(
      `#${fieldElement.id}-error`
    );
    fieldElement.classList.remove(this._fieldErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkFieldValidity(fieldElement) {
    if (!fieldElement.validity.valid) {
      this._showFieldError(fieldElement, fieldElement.validationMessage);
    } else {
      this._hideFieldError(fieldElement);
    }
  }

  _hasInvalidField() {
    return this._fieldList.some((fieldElement) => !fieldElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidField()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    this._fieldList = Array.from(
      this._formElement.querySelectorAll(this._fieldSelector)
    );

    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState();
    this._fieldList.forEach((fieldElement) => {
      fieldElement.addEventListener("input", () => {
        this._checkFieldValidity(fieldElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}
