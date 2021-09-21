const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const placesContainer = document.querySelector(".places");
const placeTemplate = document.querySelector("#place-template").content;

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageLocation = document.querySelector(".popup__image-location");

function triggerLike(likeButton) {
  likeButton.classList.toggle("place__love-button_active");
}

function createCard(placeObj) {
  const { name, link } = placeObj;

  const place = placeTemplate.querySelector(".place").cloneNode(true);
  const placeTitle = place.querySelector(".place__title");
  const placeImage = place.querySelector(".place__image");
  const placeLikeButton = place.querySelector(".place__love-button");
  const placeDeleteButton = place.querySelector(".place__delete-button");

  //fills the card with input gotten from either the initialCards array
  //or new data inputted by a user
  placeTitle.textContent = name;
  placeImage.src = link;
  placeImage.alt = name + " picture";

  //if the love button hasn't been clicked, clicking it fills the inside with black
  //if it has, changes it back to an empty love shape
  placeLikeButton.addEventListener("click", function () {
    triggerLike(placeLikeButton);
  });

  //deletes the card when its delete icon is clicked
  placeDeleteButton.addEventListener("click", function () {
    let placeToBeDeleted = placeDeleteButton.closest(".place");
    placeToBeDeleted.remove();
    placeToBeDeleted = null;
  });

  //fills the popup with the image clicked
  //and its location, then it reveals the popup
  placeImage.addEventListener("click", function () {
    popupImage.src = link;
    popupImage.alt = name + "picture";
    popupImageLocation.textContent = name;
    openPopup(popupTypeImage);
  });

  return place;
}

const cards = initialCards.map(createCard);

//displays the initial cards on the page
placesContainer.prepend(...cards);

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

const popupTypeImageCloseButton = document.querySelector(
  ".popup_type_image .popup__close-button"
);

//opens popup
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

//closes popup
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
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
  enableValidation();
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
  const newCard = createCard({
    name: popupFieldPlaceTitle.value,
    link: popupFieldPlaceImageURL.value,
  });

  placesContainer.prepend(newCard);
  closePopup(popupTypeAdd);
}

const showFieldError = (formElement, fieldElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${fieldElement.id}-error`);
  //console.log(errorElement);
  fieldElement.classList.add("popup__field_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__field-error_active");
};

const hideFieldError = (formElement, fieldElement) => {
  const errorElement = formElement.querySelector(`#${fieldElement.id}-error`);
  //console.log(errorElement);
  fieldElement.classList.remove("popup__field_type_error");
  errorElement.classList.remove("popup__field-error_active");
  errorElement.textContent = "";
};

const checkFieldValidity = (formElement, fieldElement) => {
  //console.log(fieldElement);
  if (!fieldElement.validity.valid) {
    showFieldError(formElement, fieldElement, fieldElement.validationMessage);
  } else {
    hideFieldError(formElement, fieldElement);
  }
};

const hasInvalidField = (fieldList) => {
  return fieldList.some((fieldElement) => !fieldElement.validity.valid);
};

const toggleButtonState = (fieldList, buttonElement) => {
  if (hasInvalidField(fieldList)) {
    buttonElement.classList.add("popup__submit-button_inactive");
  } else {
    buttonElement.classList.remove("popup__submit-button_inactive");
  }
};

const setEventListeners = (formElement) => {
  const fieldList = Array.from(formElement.querySelectorAll(".popup__field"));

  const buttonElement = formElement.querySelector(
    `#${formElement.id} .popup__submit-button`
  );
  //console.log(buttonElement);
  toggleButtonState(fieldList, buttonElement);

  fieldList.forEach((fieldElement) => {
    fieldElement.addEventListener("input", function () {
      checkFieldValidity(formElement, fieldElement);
      toggleButtonState(fieldList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const popupFormList = Array.from(document.querySelectorAll(".popup__form"));
  popupFormList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    //console.log(formElement.closest(".popup").className);

    setEventListeners(formElement);
  });
};

profileEditButton.addEventListener("click", openProfilePopup);

popupTypeEditCloseButton.addEventListener("click", function () {
  closePopup(popupTypeEdit);
});

popupTypeEditSaveButton.addEventListener("click", updateProfile);

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeAdd);
  enableValidation();
});

popupTypeAddCloseButton.addEventListener("click", function () {
  closePopup(popupTypeAdd);
});

popupTypeAddSaveButton.addEventListener("click", addCard);

popupTypeImageCloseButton.addEventListener("click", function () {
  closePopup(popupTypeImage);
});

popupTypeEdit.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup_type_edit")) {
    closePopup(popupTypeEdit);
  }
});

popupTypeAdd.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup_type_add")) {
    closePopup(popupTypeAdd);
  }
});

popupTypeImage.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup_type_image")) {
    closePopup(popupTypeImage);
  }
});
