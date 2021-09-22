const showFieldError = (formElement, fieldElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${fieldElement.id}-error`);

  fieldElement.classList.add(`${classObjects.fieldErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${classObjects.errorClass}`);
};

const hideFieldError = (formElement, fieldElement, classObjects) => {
  const errorElement = formElement.querySelector(`#${fieldElement.id}-error`);

  fieldElement.classList.remove(`${classObjects.fieldErrorClass}`);
  errorElement.classList.remove(`${classObjects.errorClass}`);
  errorElement.textContent = "";
};

const checkFieldValidity = (formElement, fieldElement, classObjects) => {
  //console.log(fieldElement);
  if (!fieldElement.validity.valid) {
    showFieldError(
      formElement,
      fieldElement,
      fieldElement.validationMessage,
      classObjects
    );
  } else {
    hideFieldError(formElement, fieldElement, classObjects);
  }
};

const hasInvalidField = (fieldList) => {
  return fieldList.some((fieldElement) => !fieldElement.validity.valid);
};

const toggleButtonState = (fieldList, buttonElement, classObjects) => {
  if (hasInvalidField(fieldList)) {
    buttonElement.classList.add(`${classObjects.inactiveButtonClass}`);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(`${classObjects.inactiveButtonClass}`);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (
  formElement,
  { fieldSelector, submitButtonSelector, ...classObjects }
) => {
  const fieldList = Array.from(formElement.querySelectorAll(fieldSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  //console.log(buttonElement);
  toggleButtonState(fieldList, buttonElement);
  fieldList.forEach((fieldElement) => {
    fieldElement.addEventListener("input", function () {
      checkFieldValidity(formElement, fieldElement, classObjects);
      toggleButtonState(fieldList, buttonElement, classObjects);
    });
  });
};

const enableValidation = ({ formSelector, ...otherObjects }) => {
  const popupFormList = Array.from(document.querySelectorAll(formSelector));
  popupFormList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, otherObjects);
  });
};

const resetFormValidation = (popupElement) => {
  if (popupElement.querySelector(".popup__form")) {
    popupElement.querySelector(".popup__form").reset();
  }
};

enableValidation({
  formSelector: ".popup__form",
  fieldSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  fieldErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
});
