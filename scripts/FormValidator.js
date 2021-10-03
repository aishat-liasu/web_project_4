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

  _hasInvalidField(fieldList) {
    return fieldList.some((fieldElement) => !fieldElement.validity.valid);
  }

  _toggleButtonState(fieldList, buttonElement) {
    if (this._hasInvalidField(fieldList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    const fieldList = Array.from(
      this._formElement.querySelectorAll(this._fieldSelector)
    );

    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(fieldList, buttonElement);
    fieldList.forEach((fieldElement) => {
      fieldElement.addEventListener("input", () => {
        this._checkFieldValidity(fieldElement);
        this._toggleButtonState(fieldList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}
