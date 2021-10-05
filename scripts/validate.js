// resets the form
export const resetForm = (popupElement) => {
  const popupForm = popupElement.querySelector(".popup__form");

  if (popupForm) {
    popupForm.reset();
  }
};
