import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";

import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

import {
  initialCards,
  profileAddButton,
  profileEditButton,
  popupFieldTitle,
  popupFieldSubtitle,
} from "../scripts/utils/constants.js";

import "./index.css";

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item);
    },
  },
  ".places"
);

const createCard = (item) => {
  const card = new Card(item, "#place-template", () => {
    const imagePopup = new PopupWithImage(".popup_type_image");
    imagePopup.setEventListeners();
    imagePopup.open(item);
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

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

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});

const popupAdd = new PopupWithForm((item) => {
  createCard({ name: item.placeName, link: item.placeImageURL });
}, ".popup_type_add");

const popupEdit = new PopupWithForm((item) => {
  userInfo.setUserInfo(item);
}, ".popup_type_edit");

popupAdd.setEventListeners();
popupEdit.setEventListeners();

profileEditButton.addEventListener("click", function () {
  popupEdit.open();

  const { name, job } = userInfo.getUserInfo();
  popupFieldTitle.value = name;
  popupFieldSubtitle.value = job;
});

profileAddButton.addEventListener("click", function () {
  popupAdd.open();
});
