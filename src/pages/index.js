import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";

import Popup from "../scripts/components/Popup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

import Api from "../scripts/components/Api.js";

import {
  initialCards,
  profileAddButton,
  profileEditButton,
  popupFieldTitle,
  popupFieldSubtitle,
} from "../scripts/utils/constants.js";

import "./index.css";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-11",
  headers: {
    authorization: "403bdafc-0a52-4e02-9b82-c7e8e4f7ffb1",
    "Content-Type": "application/json",
  },
});

const userDetails = api.getUserInfo();
api.getInitialCards();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item);
    },
  },
  ".places"
);

const imagePopup = new PopupWithImage(".popup_type_image");

const getCard = (item) => {
  const card = new Card(item, "#place-template", () => {
    imagePopup.open(item);
  });
  return card.generateCard();
};

const createCard = (item) => {
  const cardElement = getCard(item);
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

const { name, about } = userDetails;

userInfo.setUserInfo({ profileName: name, profileJob: about });

const popupAdd = new PopupWithForm((item) => {
  createCard({ name: item.placeName, link: item.placeImageURL });
}, ".popup_type_add");

const popupEdit = new PopupWithForm((item) => {
  userInfo.setUserInfo(item);
}, ".popup_type_edit");

const popupConfirm = new Popup(".popup_type_confirm");

popupAdd.setEventListeners();
popupEdit.setEventListeners();
imagePopup.setEventListeners();
popupConfirm.setEventListeners();

profileEditButton.addEventListener("click", function () {
  popupEdit.open();

  const { name, job } = userInfo.getUserInfo();
  popupFieldTitle.value = name;
  popupFieldSubtitle.value = job;
});

profileAddButton.addEventListener("click", function () {
  popupAdd.open();
});
