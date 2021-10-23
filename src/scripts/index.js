import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";

import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";

import { initialCards } from "./initial-cards.js";

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#place-template");
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".places"
);

cardList.renderItems();

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

const profileAddButton = document.querySelector(".profile__add-button");

const popupFieldPlaceTitle = document.querySelector(
  ".popup__field_el_place-title"
);

const popupFieldPlaceImageURL = document.querySelector(
  ".popup__field_el_place-image-url"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

const popupAdd = new PopupWithForm(() => {
  const newCard = new Card(
    {
      name: popupFieldPlaceTitle.value,
      link: popupFieldPlaceImageURL.value,
    },
    "#place-template"
  );

  cardList.addItem(newCard.generateCard());
}, ".popup_type_add");

const popupEdit = new PopupWithForm(() => {
  userInfo.setUserInfo();
}, ".popup_type_edit");

popupAdd.setEventListeners();
popupEdit.setEventListeners();

profileEditButton.addEventListener("click", function () {
  popupEdit.open();
  userInfo.getUserInfo();
});

profileAddButton.addEventListener("click", function () {
  popupAdd.open();
});
