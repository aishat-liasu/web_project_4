export default class FormValidator {
  constructor(
    {
      formSelector,
      fieldSelector,
      submitButtonSelector,
      inactiveButtonClass,
      fieldErrorClass,
      errorClass,
    },
    formElement
  ) {
    this._formSelector = formSelector;
    this._fieldSelector = fieldSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._fieldErrorClass = fieldErrorClass;
    this._errorClass = errorClass;
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
    this._formElement.addEventListener("reset", () => {
      this._fieldList.forEach((fieldElement) => {
        fieldElement.value = "";
        this._hideFieldError(fieldElement);
      });
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
