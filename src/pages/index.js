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
  profileOverlay,
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatarSelector,
} from "../scripts/utils/constants.js";

import "./index.css";

const userInfo = new UserInfo({
  nameSelector: profileTitleSelector,
  jobSelector: profileSubtitleSelector,
  avatarSelector: profileAvatarSelector,
});

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-11",
  headers: {
    authorization: "403bdafc-0a52-4e02-9b82-c7e8e4f7ffb1",
    "Content-Type": "application/json",
  },
});

function setUserDetails({ name, about, avatar }) {
  userInfo.setUserInfo({
    profileName: name,
    profileJob: about,
    profileAvatar: avatar,
  });
}

let userId = "";
let cardList = "";

const getCard = (item) => {
  const card = new Card({
    data: item,
    templateSelector: "#place-template",
    handleClick: () => {
      imagePopup.open(item);
    },
    handleDelete: (cardId, removeCard) => {
      popupConfirm.open();
      popupConfirmSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();
        api
          .deleteCard(cardId)
          .then(() => {
            removeCard();
          })
          .catch((err) => {
            console.log(err); // log the error to the console
          });
        popupConfirm.close();
      });
    },
    likeCard: (cardId, placeLikeCount) => {
      api
        .likeCard(cardId)
        .then((result) => {
          placeLikeCount.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unlikeCard: (cardId, placeLikeCount) => {
      api
        .unlikeCard(cardId)
        .then((result) => {
          placeLikeCount.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    userId,
  });
  return card.generateCard();
};

const createCard = (item) => {
  const cardElement = getCard(item);
  cardList.addItem(cardElement);
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((result) => {
    console.log(result);
    setUserDetails(result[0]);
    userId = result[0]._id;
    cardList = new Section(
      {
        items: result[1],
        renderer: (item) => {
          createCard(item);
        },
      },
      ".places"
    );

    if (userId) {
      cardList.renderItems();
    }
  })
  .catch((err) => {
    console.log(err); // log the error to the console
  });

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

const popupAddPlace = new PopupWithForm((item, onUpload, afterUpload) => {
  onUpload();
  api
    .uploadPlace({ name: item.placeName, link: item.placeImageURL })
    .then((result) => {
      createCard(result);
      popupAddPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      afterUpload();
    });
}, ".popup_type_add");

const popupEditProfile = new PopupWithForm((item, onUpload, afterUpload) => {
  onUpload();
  api
    .updateUserInfo(item)
    .then((result) => {
      setUserDetails(result);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      afterUpload();
    });
}, ".popup_type_edit");

const popupUpdateAvatar = new PopupWithForm((item, onUpload, afterUpload) => {
  onUpload();
  api
    .updateUserAvatar(item)
    .then((result) => {
      //console.log(result);
      setUserDetails(result);
      popupUpdateAvatar.close();
    })
    .catch((err) => {
      console.log(err); // log the error to the console
    })
    .finally(() => {
      afterUpload();
    });
}, ".popup_type_change");

const popupConfirm = new Popup(".popup_type_confirm");

popupAddPlace.setEventListeners();
popupEditProfile.setEventListeners();
popupUpdateAvatar.setEventListeners();
imagePopup.setEventListeners();
popupConfirm.setEventListeners();

profileEditButton.addEventListener("click", function () {
  popupEditProfile.open();

  const { name, job } = userInfo.getUserInfo();
  popupFieldTitle.value = name;
  popupFieldSubtitle.value = job;
});

profileAddButton.addEventListener("click", function () {
  popupAddPlace.open();
});

profileOverlay.addEventListener("click", function () {
  popupUpdateAvatar.open();
});
