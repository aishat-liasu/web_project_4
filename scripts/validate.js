class FormValidator {
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

const popupFormList = Array.from(document.querySelectorAll(".popup__form"));

popupFormList.forEach((formElement) => {
  const formToBeValidated = new FormValidator(
    {
      formSelector: ".popup__form",
      fieldSelector: ".popup__field",
      submitButtonSelector: ".popup__submit-button",
      inactiveButtonClass: "popup__submit-button_disabled",
      fieldErrorClass: "popup__field_type_error",
      errorClass: "popup__field-error_active",
    },
    formElement
  );
  formToBeValidated.enableValidation();
});

const hideFieldError = (formElement, fieldElement) => {
  const errorElement = formElement.querySelector(`#${fieldElement.id}-error`);

  fieldElement.classList.remove("popup__field_type_error");
  errorElement.classList.remove("popup__field-error_active");
  errorElement.textContent = "";
};

//clears the error indicators and resets the form
const resetForm = (popupElement) => {
  const popupForm = popupElement.querySelector(".popup__form");
  const popupFieldList = Array.from(
    popupElement.querySelectorAll(".popup__field")
  );
  const buttonElement = popupElement.querySelector(".popup__submit-button");

  popupFieldList.forEach((fieldElement) => {
    hideFieldError(popupForm, fieldElement);
  });
  popupForm.reset();

  buttonElement.classList.add("popup__submit-button_disabled");
  buttonElement.setAttribute("disabled", true);
};
