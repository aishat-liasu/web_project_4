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
