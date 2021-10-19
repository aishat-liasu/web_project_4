import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { initialCards } from "./initial-cards.js";
import { resetForm } from "./validate.js";

const cards = initialCards.map((item) => {
  const card = new Card(item, "#place-template");
  return card.generateCard();
});

const placesContainer = document.querySelector(".places");

//displays the initial cards on the page
placesContainer.prepend(...cards);

const popupList = Array.from(document.querySelectorAll(".popup"));
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

const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeEditCloseButton = document.querySelector(
  ".popup_type_edit .popup__close-button"
);
const popupTypeEditSaveButton = document.querySelector(
  ".popup_type_edit .popup__submit-button"
);

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const popupFieldTitle = document.querySelector(".popup__field_el_title");
const popupFieldSubtitle = document.querySelector(".popup__field_el_subtitle");

const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeAdd = document.querySelector(".popup_type_add");
const popupTypeAddCloseButton = document.querySelector(
  ".popup_type_add .popup__close-button"
);
const popupTypeAddSaveButton = document.querySelector(
  ".popup_type_add .popup__submit-button"
);

const popupFieldPlaceTitle = document.querySelector(
  ".popup__field_el_place-title"
);
const popupFieldPlaceImageURL = document.querySelector(
  ".popup__field_el_place-image-url"
);

//closes popup when the Esc key is clicked
const handleEscapeKey = (evt) => {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
};

//adds event to the document
function addEventToDocument() {
  document.addEventListener("keydown", handleEscapeKey);
}

//removes event to the document
function removeEventFromDocument() {
  document.removeEventListener("keydown", handleEscapeKey);
}

//opens popup
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  addEventToDocument();
}

//closes popup
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  removeEventFromDocument();
  resetForm(popupElement);
}

//fills the values of the input fields to the value gotten from the page.
function fillProfileFormFields() {
  popupFieldTitle.value = profileTitle.textContent;
  popupFieldSubtitle.value = profileSubtitle.textContent;
}

//shows the edit profile popup,
//then fills the fields
function openProfilePopup() {
  openPopup(popupTypeEdit);
  fillProfileFormFields();
}

//changes the profile title and subtitle,
//then closes the popup
function updateProfile(e) {
  e.preventDefault();
  profileTitle.textContent = popupFieldTitle.value;
  profileSubtitle.textContent = popupFieldSubtitle.value;
  closePopup(popupTypeEdit);
}

//adds a new card to the main page
//then closes the popup
function addCard(e) {
  e.preventDefault();
  const newCard = new Card(
    {
      name: popupFieldPlaceTitle.value,
      link: popupFieldPlaceImageURL.value,
    },
    "#place-template"
  );

  placesContainer.prepend(newCard.generateCard());
  closePopup(popupTypeAdd);
}

//closes popup when the popup overlay is clicked
const handleClickOutsideForm = (evt, popupElement) => {
  if (evt.target.classList.contains(evt.target.id)) {
    closePopup(popupElement);
  }
};

//assigns events to all the popups
const setEventForPopups = () => {
  popupList.forEach((popupElement) => {
    popupElement.addEventListener("click", (evt) =>
      handleClickOutsideForm(evt, popupElement)
    );
  });
};

setEventForPopups();

profileEditButton.addEventListener("click", openProfilePopup);

popupTypeEditCloseButton.addEventListener("click", function () {
  closePopup(popupTypeEdit);
});

popupTypeEditSaveButton.addEventListener("click", updateProfile);

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeAdd);
});

popupTypeAddCloseButton.addEventListener("click", function () {
  closePopup(popupTypeAdd);
});

popupTypeAddSaveButton.addEventListener("click", addCard);
