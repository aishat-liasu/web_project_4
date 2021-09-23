const showFieldError = (
  formElement,
  fieldElement,
  errorMessage,
  classObjects
) => {
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

  toggleButtonState(fieldList, buttonElement, classObjects);
  fieldList.forEach((fieldElement) => {
    fieldElement.addEventListener("input", function () {
      console.log(fieldElement);
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

const resetForm = (popupElement) => {
  if (popupElement.querySelector(".popup__form")) {
    popupElement.querySelector(".popup__form").reset();
  }
};
