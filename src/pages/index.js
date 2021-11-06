import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

import {
  profileAddButton,
  profileEditButton,
  popupFieldTitle,
  popupFieldSubtitle,
  popupConfirmSubmitButton,
} from "../scripts/utils/constants.js";

import "./index.css";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-11",
  headers: {
    authorization: "403bdafc-0a52-4e02-9b82-c7e8e4f7ffb1",
    "Content-Type": "application/json",
  },
});

function setUserDetails(item) {
  const { name, about, avatar } = item;
  userInfo.setUserInfo({
    profileName: name,
    profileJob: about,
    profileAvatar: avatar,
  });
}

let userId = "";
api
  .getUserInfo()
  .then((result) => {
    console.log(result);
    setUserDetails(result);
    userId = result._id;
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

let cardList = "";

api
  .getInitialCards()
  .then((result) => {
    console.log(result);
    const initialCards = result;
    cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          createCard(item);
        },
      },
      ".places"
    );

    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

const getCard = (item) => {
  const card = new Card(
    item,
    "#place-template",
    () => {
      imagePopup.open(item);
    },
    (cardId) => {
      popupConfirm.open();
      popupConfirmSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();

        api
          .deleteCard(cardId)
          .then((result) => {
            console.log(result);
            cardList.renderItems();
          })
          .catch((err) => {
            console.log(err); // log the error to the console
          });
        popupConfirm.close();
      });
    },
    (cardId) => {
      api
        .likeCard(cardId)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err); // log the error to the console
        });
    },
    (cardId) => {
      api
        .unlikeCard(cardId)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err); // log the error to the console
        });
    },
    userId
  );
  return card.generateCard();
};

const createCard = (item) => {
  const cardElement = getCard(item);
  cardList.addItem(cardElement);
};

const imagePopup = new PopupWithImage(".popup_type_image");

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

const popupAdd = new PopupWithForm((item) => {
  api
    .uploadPlace({ name: item.placeName, link: item.placeImageURL })
    .then((result) => {
      console.log(result);
      createCard(result);
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    });
}, ".popup_type_add");

const popupEdit = new PopupWithForm((item) => {
  api
    .updateUserInfo(item)
    .then((result) => {
      console.log(result);
      setUserDetails(result);
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    });
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
